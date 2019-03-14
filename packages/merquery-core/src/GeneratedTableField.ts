import { Row } from "./Row";
import { ComperatorCondition, InCondition } from "./Condition";
import { FieldAlias, TableField, Field } from "./Field";

export interface GeneratedTableField<R extends Row, T> {
  FIELD: TableField<R, T>;

  equals(value: T): ComperatorCondition;
  equalsField(field: Field<T>): ComperatorCondition;

  lessThan(value: T): ComperatorCondition;
  lessThanField(field: Field<T>): ComperatorCondition;

  greaterThan(value: T): ComperatorCondition;
  greaterThanField(field: Field<T>): ComperatorCondition;

  in(value: T, ...values: T[]): InCondition;

  alias(name: string): FieldAlias<T>;
}
