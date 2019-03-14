import { Condition } from "./Condition";
import { ConditionBuilderFinalStep } from "./ConditionBuilderFinalStep";
export interface ConditionBuilder extends ConditionBuilderFinalStep {
  and(condition: Condition): ConditionBuilder;
  or(condition: Condition): ConditionBuilder;
}
