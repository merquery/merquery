import { FieldCollection } from "../../../../FieldCollection";
import { buildField } from "./buildField";
import { Field } from "../../../../Field";
export function buildFieldCollection(fields: Field<any>[]) {
  if (fields.length < 1)
    throw new Error("Array needs to have one or more fields.");

  return fields.map(buildField).join(", ");
}
