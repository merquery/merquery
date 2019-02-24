import { QueryPartInternal } from "./QueryPart";
import { Table } from "./TableLike";
import { Field, val } from "./Field";
import { ConditionWithOperator } from "./ConditionWithOperator";
import { ConditionBuilderFinalStep } from "./ConditionBuilderFinalStep";

export type Comperator = "=" | ">=" | "<=";

export interface ComperatorCondition {
  kind: "ComperatorCondition";
  field1: Field<any>;
  field2: Field<any>;
  comperator: Comperator;
}

export interface ConditionCollection {
  kind: "ConditionCollection";
  conditions: ConditionWithOperator[];
}

export type Condition = ComperatorCondition | ConditionCollection;

export function compare<T1, T2>(
  field1: Field<T1>,
  comperator: Comperator,
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
