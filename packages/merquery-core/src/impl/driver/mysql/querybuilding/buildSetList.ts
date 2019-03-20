import { val } from "../../../util/val";
import { ValueField } from "../../../../ValueField";
import { TableField } from "../../../../TableField";
import { Row } from "../../../../Row";
import { buildField } from "./buildField";
import { buildValueField } from "./buildValueField";
import { OneOrMoreArray, OneOrMoreArrayUtil } from "../../../OneOrMoreArray";
import { TableValueField } from "../../../../TableValueField";

function buildAssignment<R extends Row, T>(v: TableValueField<R, T>) {
  return `${buildField(v.tableField)} = ${buildValueField(val(v.value))}`;
}

export function buildSetList<R extends Row>(
  assignments: OneOrMoreArray<TableValueField<R, any>>
) {
  return OneOrMoreArrayUtil.toArray(assignments)
    .map(buildAssignment)
    .join(", ");
}
