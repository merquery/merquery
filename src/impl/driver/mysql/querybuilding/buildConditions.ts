import { ConditionCollection } from "../../../../Condition";
import { buildConditionOperatorString } from "./buildConditionOperatorString";
import { buildCondition } from "./buildCondition";
export function buildConditions(c: ConditionCollection) {
  const conditions = c.conditions;
  if (conditions.length === 0)
    throw new Error("ConditionCollection needs atleast one element");
  return conditions
    .reduce((str, condition, i) => {
      let conditionStr = ``;
      if (i > 0) {
        conditionStr += ` ${buildConditionOperatorString(condition.operator)}`;
      }
      conditionStr += ` ${buildCondition(
        condition.condition,
        conditions.length
      )}`;
      return str + conditionStr;
    }, "")
    .trim();
}
