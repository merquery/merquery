import { Table, TableLikeOrTableLikeAlias } from "../TableLike";
import { Row } from "../Row";
import { TableField, val } from "../Field";
import { ResultRow } from "../QueryResult";
import { isDataType } from "../DataType";
import { assertNever } from "./Util";
import { FieldOwner } from "../FieldOwner";
import { buildTableField } from "./driver/mysql/querybuilding/buildTableField";

function buildTableFieldName<R extends Row, T>(field: TableField<R, T>) {
  return buildTableField(field);
}

export class RowUtility {
  static buildRow<R extends Row>(table: Table<R>, result: ResultRow) {
    const obj: any = { __row_kind__: table.rowKind };
    table.fields.forEach(field => {
      const value = this.getValueOrUndefined(result, field);
      if (typeof value === "undefined") {
        throw new Error(
          `Value for field ${buildTableFieldName(
            field
          )} was undefined. Consider using buildPartialRow/createPartialMapper instead if you want to allow undefined values.`
        );
      }

      obj[field.column] = value;
    });

    return obj as R;
  }

  static createMapper<R extends Row>(
    table: Table<R>
  ): (result: ResultRow) => R {
    return result => this.buildRow(table, result);
  }

  static buildPartialRow<R extends Row>(
    table: Table<R>,
    result: ResultRow
  ): Partial<R> {
    const obj: any = { __row_kind__: table.rowKind };
    table.fields.forEach(field => {
      const value = this.getValueOrUndefined(result, field);
      obj[field.column] = value;
    });

    return obj as Partial<R>;
  }

  static createPartialMapper<R extends Row>(
    table: Table<R>
  ): (result: ResultRow) => Partial<R> {
    return result => this.buildPartialRow(table, result);
  }

  static getValue<R extends Row, T>(
    result: ResultRow,
    field: TableField<R, T>
  ) {
    const value = this.getValueOrUndefined(result, field);
    if (typeof value === "undefined")
      throw new Error(
        `Value for field ${buildTableFieldName(field)} is undefined.`
      );

    return value;
  }

  private static getTableNameOrAlias(fieldOwner: FieldOwner) {
    switch (fieldOwner.kind) {
      case "TableFieldOwner":
        return fieldOwner.table;
      case "AliasFieldOwner":
        return fieldOwner.alias;
      default:
        return assertNever(fieldOwner);
    }
  }

  static getValueOrUndefined<R extends Row, T>(
    result: ResultRow,
    field: TableField<R, T>
  ) {
    const tableFields = result[this.getTableNameOrAlias(field.table)];
    if (!tableFields) {
      return undefined;
    }

    const res = tableFields[field.column];

    if (typeof res === "undefined") {
      return undefined;
    }

    if (field.type.nullable && res === null) {
      return null;
    }

    if (!isDataType<T>(field.type, res)) {
      throw new Error(
        `Invalid value for table field "${buildTableFieldName(
          field
        )}". Value ${JSON.stringify(res)} is not assignable to type ${
          field.type.type
        }.`
      );
    }

    return res;
  }
}
