import { Row } from "./Row";
import { ComparatorCondition } from "./ComparatorCondition";
import { InCondition } from "./InCondition";
import { Field } from "./Field";
import { FieldAlias } from "./FieldAlias";
import { TableField } from "./TableField";

export interface GeneratedTableField<R extends Row, T> {
  FIELD: TableField<R, T>;

  equals(value: T): ComparatorCondition;
  equalsField(field: Field<T>): ComparatorCondition;

  lessThan(value: T): ComparatorCondition;
  lessThanField(field: Field<T>): ComparatorCondition;

  greaterThan(value: T): ComparatorCondition;
  greaterThanField(field: Field<T>): ComparatorCondition;

  in(value: T, ...values: T[]): InCondition;

  alias(name: string): FieldAlias<T>;
}
