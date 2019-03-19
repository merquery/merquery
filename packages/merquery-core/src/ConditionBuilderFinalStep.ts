import { Condition } from "./Condition";
export interface ConditionBuilderFinalStep {
  /**
   * @returns the build condition
   */
  getCondition(): Condition;
}
