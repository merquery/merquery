import { ConditionCollection } from "../../../../Condition";
import { buildConditionOperatorString } from "./buildConditionOperatorString";
import { buildCondition } from "./buildCondition";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";
export function buildConditions(c: ConditionCollection) {
  const conditions = c.conditions;

  return OneOrMoreArrayUtil.toArray(conditions)
    .reduce((str, condition, i) => {
      let conditionStr = ``;
      if (i > 0) {
        conditionStr += ` ${buildConditionOperatorString(condition.operator)}`;
      }
      conditionStr += ` ${buildCondition(
        condition.condition,
        OneOrMoreArrayUtil.length(conditions)
      )}`;
      return str + conditionStr;
    }, "")
    .trim();
}
