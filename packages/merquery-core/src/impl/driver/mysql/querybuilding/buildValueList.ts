import { Field } from "../../../../Field";
import { ValueField } from "../../../../ValueField";
import { buildValueField } from "./buildValueField";
import { OneOrMoreArray, OneOrMoreArrayUtil } from "../../../OneOrMoreArray";
import { buildField } from "./buildField";

export function buildFieldList(values: OneOrMoreArray<Field<any>>) {
  return `(${OneOrMoreArrayUtil.toArray(values)
    .map(buildField)
    .join(", ")})`;
}
