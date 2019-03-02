import { Condition } from "../../../../Condition";
import { buildCondition } from "./buildCondition";
import { buildConditions } from "./buildConditions";
import { ConditionOperator } from "../../../../ConditionOperator";

export function buildHavingCondition(condition: Condition) {
  return buildConditions({
    kind: "ConditionCollection",
    conditions: [{ condition: condition, operator: ConditionOperator.And }]
  });
}
