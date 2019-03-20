import { Table, TableLikeOrTableLikeAlias } from "../TableLike";
import { Row } from "../Row";
import { val } from "./util/val";
import { TableField } from "../TableField";
import { ResultRow } from "../ResultRow";
import { assertNever } from "./Util";
import { FieldOwner } from "../FieldOwner";
import { buildTableField } from "./driver/mysql/querybuilding/buildTableField";
import { buildField } from "./driver/mysql/querybuilding/buildField";
import { Converter } from "../Converter";
import { MappingContext } from "../MappingContext";
import { ConverterFactory } from "../ConverterFactory";
import { Converters } from "../Converters";
import { DataTypeProps } from "../DataTypeProps";
import { BaseConverter } from "./driver/mysql/conversion/BaseConverter";

function buildTableFieldName<R extends Row, T>(field: TableField<R, T>) {
  return buildTableField(field);
}

export class RowUtility {
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

  private static getConverter(
    converters: Converters,
    dataType: DataTypeProps
  ): BaseConverter<DataTypeProps, any> {
    switch (dataType.type) {
      case "DATE":
        return converters.date;
      case "ENUM":
        return converters.enum;
      case "INTEGER":
        return converters.integer;
      case "STRING":
        return converters.string;

      default:
        return assertNever(dataType);
    }
  }

  static getValueOrUndefined<R extends Row, T>(
    converters: Converters,
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

    const convertResult = this.getConverter(
      converters,
      field.type
    ).convertToJavaScript(field.type, res);
    if (convertResult.kind === "ConvertError") {
      throw new Error(
        `Error converting value for field ${buildField(field)}. Reason: ${
          convertResult.reason
        }. Value was ${JSON.stringify(res)}.`
      );
    }

    return convertResult.value;
  }

  private static baseBuildRow<R extends Row>(
    context: MappingContext,
    table: Table<R>,
    result: ResultRow,
    preventUndefined: boolean
  ) {
    const obj: any = { __ROW_KIND__: table.rowKind };
    table.fields.forEach(field => {
      const value = this.getValueOrUndefined(context.converters, result, field);
      if (typeof value === "undefined" && preventUndefined) {
        throw new Error(
          `Value for field ${buildTableFieldName(
            field
          )} was undefined. Consider using buildPartialRow/createPartialMapper instead if you want to allow undefined values.`
        );
      }

      obj[field.column] = value;
    });

    return obj;
  }

  static buildRow<R extends Row>(
    context: MappingContext,
    table: Table<R>,
    result: ResultRow
  ) {
    return this.baseBuildRow(context, table, result, true) as R;
  }

  static buildPartialRow<R extends Row>(
    context: MappingContext,
    table: Table<R>,
    result: ResultRow
  ): Partial<R> {
    return this.baseBuildRow(context, table, result, false) as Partial<R>;
  }

  static createPartialMapper<R extends Row>(
    table: Table<R>
  ): (context: MappingContext, result: ResultRow) => Partial<R> {
    return (context, result) => this.buildPartialRow(context, table, result);
  }

  static createMapper<R extends Row>(
    table: Table<R>
  ): (context: MappingContext, result: ResultRow) => R {
    return (converter, result) => this.buildRow(converter, table, result);
  }
}
