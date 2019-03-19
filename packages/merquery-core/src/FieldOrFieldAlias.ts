import { FieldAlias } from "./FieldAlias";
import { Field } from "./Field";
export type FieldOrFieldAlias<T> = Field<T> | FieldAlias<T>;
