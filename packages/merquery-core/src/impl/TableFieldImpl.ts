import { val } from "./util/val";
import { Field } from "../Field";
import { FieldAlias } from "../FieldAlias";
import { TableField } from "../TableField";
import { Row } from "../Row";
import { FieldOwner } from "../FieldOwner";
import { DataTypeProps } from "../DataTypeProps";
import { ComparatorCondition } from "../ComparatorCondition";
import { InCondition } from "../InCondition";
import { EventRow } from "../testutil/TestSchema";
import { GeneratedTableField } from "../GeneratedTableField";
import { OneOrMoreArrayUtil } from "./OneOrMoreArray";
import { compare } from "./util/compare";

export class TableFieldImpl<R extends Row, T>
  implements GeneratedTableField<R, T> {
  constructor(public readonly FIELD: TableField<R, T>) {}

  equals(value: T): ComparatorCondition {
    return compare(this.FIELD, "=", val(value));
  }

  equalsField(field: Field<T>): ComparatorCondition {
    return compare(this.FIELD, "=", field);
  }

  lessThan(value: T): ComparatorCondition {
    return compare(this.FIELD, "<=", val(value));
  }

  lessThanField(field: Field<T>): ComparatorCondition {
    return compare(this.FIELD, "<=", field);
  }

  greaterThan(value: T): ComparatorCondition {
    return compare(this.FIELD, ">=", val(value));
  }

  greaterThanField(field: Field<T>): ComparatorCondition {
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
