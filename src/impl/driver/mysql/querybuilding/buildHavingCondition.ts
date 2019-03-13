import { Condition } from "../../../../Condition";
import { buildCondition } from "./buildCondition";
import { buildConditions } from "./buildConditions";
import { ConditionOperator } from "../../../../ConditionOperator";
import { ConditionWithOperator } from "../../../../ConditionWithOperator";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export function buildHavingCondition(condition: Condition) {
  return buildConditions({
    kind: "ConditionCollection",
    conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
      { condition: condition, operator: ConditionOperator.And }
    ])
  });
}
