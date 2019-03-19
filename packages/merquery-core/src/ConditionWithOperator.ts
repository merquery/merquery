import { Condition } from "./Condition";
import { ConditionOperator } from "./ConditionOperator";
export interface ConditionWithOperator {
  operator: ConditionOperator;
  condition: Condition;
}
