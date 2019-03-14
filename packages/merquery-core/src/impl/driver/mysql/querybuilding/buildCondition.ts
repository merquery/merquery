import { assertNever } from "../../../Util";
import { Condition } from "../../../../Condition";
import { buildComperatorCondition } from "./buildComperatorCondition";
import { buildConditions } from "./buildConditions";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export function buildCondition(
  condition: Condition,
  outerConditionCount: number
) {
  switch (condition.kind) {
    case "ComperatorCondition":
      return buildComperatorCondition(condition);
    case "ConditionCollection":
      if (
        OneOrMoreArrayUtil.length(condition.conditions) > 1 &&
        outerConditionCount > 1
      ) {
        return `(${buildConditions(condition)})`;
      } else {
        return buildConditions(condition);
      }

    case "InCondition":
      return;

    default:
      return assertNever(condition);
  }
}
