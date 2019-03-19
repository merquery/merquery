import { Condition } from "./Condition";
import { ConditionBuilderFinalStep } from "./ConditionBuilderFinalStep";
export interface ConditionBuilder extends ConditionBuilderFinalStep {
  /**
   * Appends a and condition
   * @param condition
   */
  and(condition: Condition): ConditionBuilder;

  /**
   * Appends a or condition
   * @param condition
   */
  or(condition: Condition): ConditionBuilder;
}
