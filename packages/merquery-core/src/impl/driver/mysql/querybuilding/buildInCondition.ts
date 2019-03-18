import { InCondition } from "../../../../InCondition";
import { buildField } from "./buildField";
import { buildFieldList } from "./buildValueList";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export function buildInCondition(condition: InCondition): string {
  return `${buildField(condition.field)} IN ${buildFieldList(
    OneOrMoreArrayUtil.toArray(condition.values)
  )}`;
}
