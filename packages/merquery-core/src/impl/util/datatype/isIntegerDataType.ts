import _ = require("lodash");
import { DataTypeIntegerProps } from "../../../DataTypeIntegerProps";
export function isIntegerDataType(typeProps: DataTypeIntegerProps, value: unknown) {
  if (!_.isNumber(value) || !_.isFinite(value) || !_.isSafeInteger(value))
    return false;
  if (!typeProps.signed && value < 0)
    return false;
  return true;
}
