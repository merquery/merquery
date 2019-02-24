import { assertNever } from "../../../Util";
import { Condition } from "../../../../Condition";
import { buildComperatorCondition } from "./buildComperatorCondition";
import { buildConditions } from "./buildConditions";

export function buildCondition(
  condition: Condition,
  outerConditionCount: number
) {
  switch (condition.kind) {
    case "ComperatorCondition":
      return buildComperatorCondition(condition);
    case "ConditionCollection":
      if (condition.conditions.length > 1 && outerConditionCount > 1) {
        return `(${buildConditions(condition)})`;
      } else {
        return buildConditions(condition);
      }
    default:
      return assertNever(condition);
  }
}
