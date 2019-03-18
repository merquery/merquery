import { Field } from "./Field";
export interface FieldAlias<T> {
  kind: "FieldAlias";
  alias: string;
  field: Field<T>;
}
