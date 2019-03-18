import { ValueField } from "../../../../ValueField";
import * as SqlString from "sqlstring";
export function buildValueField<T>(field: ValueField<T>) {
  return SqlString.escape(field.value);
}
