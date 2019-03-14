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
  constructor(public readonly FIELD: TableField<R, T>) {}

  equals(value: T): ComperatorCondition {
    return compare(this.FIELD, "=", val(value));
  }

  equalsField(field: Field<T>): ComperatorCondition {
    return compare(this.FIELD, "=", field);
  }

  lessThan(value: T): ComperatorCondition {
    return compare(this.FIELD, "<=", val(value));
  }

  lessThanField(field: Field<T>): ComperatorCondition {
    return compare(this.FIELD, "<=", field);
  }

  greaterThan(value: T): ComperatorCondition {
    return compare(this.FIELD, ">=", val(value));
  }

  greaterThanField(field: Field<T>): ComperatorCondition {
    return compare(this.FIELD, ">=", field);
  }

  in(value: T, ...values: T[]): InCondition {
    return {
      kind: "InCondition",
      field: this.FIELD,
      values: OneOrMoreArrayUtil.fromArray([value, ...values].map(val))
    };
  }

  alias(name: string): FieldAlias<T> {
    return {
      alias: name,
      field: this.FIELD,
      kind: "FieldAlias"
    };
  }
}
