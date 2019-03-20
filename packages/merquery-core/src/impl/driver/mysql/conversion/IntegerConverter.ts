import { DataTypeIntegerProps } from "../../../../DataTypeIntegerProps";
import { BaseConverter } from "./BaseConverter";
import { ConvertResult } from "../../../../ConvertResult";
import _ = require("lodash");

function convertInteger(
  dataType: DataTypeIntegerProps,
  value: unknown
): ConvertResult<number> {
  if (!_.isNumber(value) || !_.isSafeInteger(value)) {
    return { kind: "ConvertError", reason: "Value is not a safe integer" };
  }

  return { kind: "ConvertSuccess", value: value };
}

export const IntegerConverter: BaseConverter<DataTypeIntegerProps, number> = {
  convertToJavaScript: (props, value) => convertInteger(props, value),
  convertToMysql: (props, value) => convertInteger(props, value)
};
