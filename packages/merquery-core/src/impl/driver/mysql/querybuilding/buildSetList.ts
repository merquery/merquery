import { TableField, val } from "../../../../Field";
import { Row } from "../../../../Row";
import { buildField } from "./buildField";
import { buildValueField } from "./buildValueField";

function buildAssignment<R extends Row, T>(v: [TableField<R, T>, T]) {
  return `${buildField(v[0])} = ${buildValueField(val(v[1]))}`;
}

export function buildSetList<R extends Row>(
  assignments: [TableField<R, any>, any][]
) {
  return assignments.map(buildAssignment).join(", ");
}
