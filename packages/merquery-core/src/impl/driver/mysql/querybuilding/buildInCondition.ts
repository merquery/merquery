import { InCondition } from "../../../../Condition";
import { buildField } from "./buildField";
import { buildValueList } from "./buildValueList";

export function buildInCondition(condition: InCondition): string {
  return `${buildField(condition.field)} IN ${buildValueList(
    condition.values
  )}`;
}
