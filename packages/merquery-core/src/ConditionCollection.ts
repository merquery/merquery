import { ConditionWithOperator } from "./ConditionWithOperator";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";
export interface ConditionCollection {
  kind: "ConditionCollection";
  conditions: OneOrMoreArray<ConditionWithOperator>;
}
