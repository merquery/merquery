import { ValueField } from "../../../../Field";
import { buildValueField } from "./buildValueField";
import { OneOrMoreArray, OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export function buildValueList(values: OneOrMoreArray<ValueField<any>>) {
  return `(${OneOrMoreArrayUtil.toArray(values)
    .map(buildValueField)
    .join(", ")})`;
}
