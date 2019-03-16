import { ConditionWithOperator } from "./ConditionWithOperator";
import { Field, val, ValueField } from "./Field";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";

export type Comparator = "=" | ">=" | "<=";

export interface InCondition {
  kind: "InCondition";
  field: Field<any>;
  values: OneOrMoreArray<ValueField<any>>;
}

export interface ComperatorCondition {
  kind: "ComperatorCondition";
  field1: Field<any>;
  field2: Field<any>;
  comperator: Comparator;
}

export interface ConditionCollection {
  kind: "ConditionCollection";
  conditions: OneOrMoreArray<ConditionWithOperator>;
}

export type Condition = ComperatorCondition | ConditionCollection | InCondition;

export function compare<T1, T2>(
  field1: Field<T1>,
  comperator: Comparator,
  field2: Field<T2>
): ComperatorCondition {
  return {
    field1: field1,
    field2: field2,
    kind: "ComperatorCondition",
    comperator: comperator
  };
}

export function eq<T1, T2>(
  field1: Field<T1>,
  field2: Field<T2>
): ComperatorCondition {
  return compare(field1, "=", field2);
}

export function eqValue<T extends any>(
  field: Field<T>,
  value: T
): ComperatorCondition {
  return eq(field, val(value));
}
