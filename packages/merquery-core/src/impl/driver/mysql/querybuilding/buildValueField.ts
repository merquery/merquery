import { ValueField } from "../../../../ValueField";
import * as SqlString from "sqlstring";
import { TableField } from "../../../../TableField";
import { Row } from "../../../../Row";
import { isDataType } from "../../../util/datatype/isDataType";

export function buildValueField<T>(field: ValueField<T>) {
  return SqlString.escape(field.value);
}
