import { TableField, FieldAlias } from "../Field";
import { Row } from "../Row";
import { FieldOwner } from "../FieldOwner";
import { DataTypeProps } from "../DataType";
import { eqValue, ComperatorCondition } from "../Condition";
import { EventRow } from "../testutil/TestSchema";

export class TableFieldImpl<R extends Row, T> implements TableField<R, T> {
  kind!: "TableField";
  table!: FieldOwner;
  column!: string;
  type!: DataTypeProps;
  rowKind!: R["__ROW_KIND__"];

  constructor(private field: TableField<R, T>) {
    Object.assign(this, field);
  }

  equals(value: T): ComperatorCondition {
    return eqValue(this, value);
  }

  alias(name: string): FieldAlias<T> {
    return {
      alias: name,
      field: this.field,
      kind: "FieldAlias"
    };
  }
}
