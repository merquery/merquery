import { val } from "./val";
import { Field } from "../../Field";
import { ComparatorCondition } from "../../ComparatorCondition";
import { eq } from "./eq";
/**
 * Creates a condition which checks if field equals value
 * @param field Field
 * @param value Value
 */
export function eqValue<T extends any>(field: Field<T>, value: T): ComparatorCondition {
  return eq(field, val(value));
}
