import { Field } from "./Field";
import { Comparator } from "./Comparator";
export interface ComparatorCondition {
  kind: "ComperatorCondition";
  field1: Field<any>;
  field2: Field<any>;
  comperator: Comparator;
}
