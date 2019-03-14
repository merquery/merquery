import { assertNever } from "../../../Util";
import { Field } from "../../../../Field";
import { buildTableField } from "./buildTableField";
import { buildValueField } from "./buildValueField";
import { buildSubQuery } from "./buildSubQuery";
export function buildField(field: Field<any>) {
  switch (field.kind) {
    case "TableField":
      return buildTableField(field);
    case "ValueField":
      return buildValueField(field);
    case "SubQueryField":
      return buildSubQuery(field.subQuery);
    default:
      return assertNever(field);
  }
}
