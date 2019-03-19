import { Field } from "../../Field";
import { Comparator } from "../../Comparator";
import { ComparatorCondition } from "../../ComparatorCondition";
/**
 * Creates a condition which compares two fields
 * @param field1 First field
 * @param comperator comparator
 * @param field2 Second field
 */
export function compare<T1, T2>(field1: Field<T1>, comperator: Comparator, field2: Field<T2>): ComparatorCondition {
  return {
    field1: field1,
    field2: field2,
    kind: "ComperatorCondition",
    comperator: comperator
  };
}
