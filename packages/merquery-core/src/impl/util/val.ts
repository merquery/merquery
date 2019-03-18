import { ValueField } from "../../ValueField";
/**
 * Transforms a value to a field representation of the value.
 * Throws an exception if the value is undefined.
 *
 * @param v Value to wrap
 */
export function val<T>(v: T): ValueField<T> {
  if (typeof v === "undefined")
    throw new Error("Undefined is not allowed as value");
  if (v === null)
    throw new Error("Undefined is not allowed as value");
  return {
    kind: "ValueField",
    value: v
  };
}
