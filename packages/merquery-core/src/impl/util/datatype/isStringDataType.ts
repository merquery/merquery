import _ = require("lodash");
import { DataTypeStringProps } from "../../../DataTypeStringProps";
export function isStringDataType(props: DataTypeStringProps, value: unknown) {
  if (!_.isString(value))
    return false;
  return true;
}
