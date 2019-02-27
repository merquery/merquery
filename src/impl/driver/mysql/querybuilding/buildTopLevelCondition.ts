import { ConditionCollection } from "../../../../Condition";
import { buildConditions } from "./buildConditions";
export function buildTopLevelCondition(condition: ConditionCollection) {
  return buildConditions(condition);
}
