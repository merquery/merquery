import { assertNever } from "../../../Util";
import { Field } from "../../../../Field";
import { buildTableField } from "./buildTableField";
import { buildValueField } from "./buildValueField";
import { buildSubQuery } from "./buildSubQuery";
import { buildTableValueField } from "./buildTableValueField";
export function buildField(field: Field<any>) {
  switch (field.kind) {
    case "TableField":
      return buildTableField(field);
    case "ValueField":
      return buildValueField(field);
    case "SubQueryField":
      return buildSubQuery(field.subQuery);
    case "TableValueField":
      return buildTableValueField(field);

    default:
      return assertNever(field);
  }
}
