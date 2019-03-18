import { Field } from "../../Field";
import { ComparatorCondition } from "../../ComparatorCondition";
import { compare } from "./compare";
/**
 * Creates a condition which checks if two fields are equal
 * @param field1 First field
 * @param field2 Second field
 */
export function eq<T1, T2>(field1: Field<T1>, field2: Field<T2>): ComparatorCondition {
  return compare(field1, "=", field2);
}
