import { InCondition } from "../../../../InCondition";
import { buildField } from "./buildField";
import { buildFieldList } from "./buildValueList";

export function buildInCondition(condition: InCondition): string {
  return `${buildField(condition.field)} IN ${buildFieldList(
    condition.values
  )}`;
}
