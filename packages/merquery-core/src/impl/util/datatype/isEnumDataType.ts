import _ = require("lodash");
import { DataTypeEnumProps } from "../../../DataTypeEnumProps";
export function isEnumDataType<T extends string>(props: DataTypeEnumProps<T>, value: unknown): value is T {
  if (!_.isString(value))
    return false;
  return props.options.indexOf(value as T) !== -1;
}
