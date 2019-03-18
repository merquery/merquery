import { Field } from "./Field";
import { ValueField } from "./ValueField";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";
export interface InCondition {
  kind: "InCondition";
  field: Field<any>;
  values: OneOrMoreArray<ValueField<any>>;
}
