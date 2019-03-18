import { Field } from "../../../../Field";
import { ValueField } from "../../../../ValueField";
import { buildValueField } from "./buildValueField";
import { OneOrMoreArray, OneOrMoreArrayUtil } from "../../../OneOrMoreArray";
import { buildField } from "./buildField";

export function buildFieldList(values: Field<any>[]) {
  return `(${values.map(buildField).join(", ")})`;
}
