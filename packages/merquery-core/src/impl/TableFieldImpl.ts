import { TableField, FieldAlias, Field, val } from "../Field";
import { Row } from "../Row";
import { FieldOwner } from "../FieldOwner";
import { DataTypeProps } from "../DataType";
import {
  eqValue,
  ComperatorCondition,
  eq,
  compare,
  InCondition
} from "../Condition";
import { EventRow } from "../testutil/TestSchema";
import { GeneratedTableField } from "../GeneratedTableField";
import { OneOrMoreArrayUtil } from "./OneOrMoreArray";

export class TableFieldImpl<R extends Row, T>
  implements GeneratedTableField<R, T> {
  kind!: "TableField";
  table!: FieldOwner;
  column!: string;
  type!: DataTypeProps;
  rowKind!: R["__ROW_KIND__"];

  constructor(private field: TableField<R, T>) {
    Object.assign(this, field);
  }

  equals(value: T): ComperatorCondition {
    return compare(this.field, "=", val(value));
  }

  equalsField(field: Field<T>): ComperatorCondition {
    return compare(this.field, "=", field);
  }

  lessThan(value: T): ComperatorCondition {
    return compare(this.field, "<=", val(value));
  }

  lessThanField(field: Field<T>): ComperatorCondition {
    return compare(this.field, "<=", field);
  }

  greaterThan(value: T): ComperatorCondition {
    return compare(this.field, ">=", val(value));
  }

  greaterThanField(field: Field<T>): ComperatorCondition {
    return compare(this.field, ">=", field);
  }

  in(value: T, ...values: T[]): InCondition {
    return {
      kind: "InCondition",
      field: this.field,
      values: OneOrMoreArrayUtil.fromArray([value, ...values].map(val))
    };
  }

  alias(name: string): FieldAlias<T> {
    return {
      alias: name,
      field: this.field,
      kind: "FieldAlias"
    };
  }
}
