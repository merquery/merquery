import { ValueField, Field } from "../../../../Field";
import { buildValueField } from "./buildValueField";
import { OneOrMoreArray, OneOrMoreArrayUtil } from "../../../OneOrMoreArray";
import { buildField } from "./buildField";

export function buildFieldList(values: OneOrMoreArray<Field<any>>) {
  return `(${OneOrMoreArrayUtil.toArray(values)
    .map(buildField)
    .join(", ")})`;
}
