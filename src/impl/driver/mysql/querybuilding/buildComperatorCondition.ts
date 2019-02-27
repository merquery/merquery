import { ComperatorCondition } from "../../../../Condition";
import { buildField } from "./buildField";
import { buildComperatorConditionComparator } from "./buildComperatorConditionComparator";
export function buildComperatorCondition(condition: ComperatorCondition) {
  return `${buildField(condition.field1)} ${buildComperatorConditionComparator(
    condition.comperator
  )} ${buildField(condition.field2)}`;
}
