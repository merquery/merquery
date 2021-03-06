import { ComparatorCondition } from "../../../../ComparatorCondition";
import { buildField } from "./buildField";
import { buildComperatorConditionComparator } from "./buildComperatorConditionComparator";
export function buildComperatorCondition(condition: ComparatorCondition) {
  return `${buildField(condition.field1)} ${buildComperatorConditionComparator(
    condition.comperator
  )} ${buildField(condition.field2)}`;
}
