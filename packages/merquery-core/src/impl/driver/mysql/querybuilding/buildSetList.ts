import { val } from "../../../util/val";
import { ValueField } from "../../../../ValueField";
import { TableField } from "../../../../TableField";
import { Row } from "../../../../Row";
import { buildField } from "./buildField";
import { buildValueField } from "./buildValueField";
import { OneOrMoreArray, OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export type Assignment<R extends Row, T> = [TableField<R, T>, ValueField<T>];

function buildAssignment<R extends Row, T>(v: Assignment<R, T>) {
  return `${buildField(v[0])} = ${buildValueField(v[1])}`;
}

export function buildSetList<R extends Row>(
  assignments: OneOrMoreArray<Assignment<R, any>>
) {
  return OneOrMoreArrayUtil.toArray(assignments)
    .map(buildAssignment)
    .join(", ");
}
