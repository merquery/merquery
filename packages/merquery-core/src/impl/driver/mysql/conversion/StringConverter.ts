import { BaseConverter } from "./BaseConverter";
import { DataTypeStringProps } from "../../../../DataTypeStringProps";
import { ConvertResult } from "../../../../ConvertResult";
import _ = require("lodash");

function convertString(
  dataType: DataTypeStringProps,
  value: unknown
): ConvertResult<string> {
  if (!_.isString(value)) {
    return { kind: "ConvertError", reason: "Value is not a string" };
  }
  return { kind: "ConvertSuccess", value: value };
}

export const StringConverter: BaseConverter<DataTypeStringProps, string> = {
  convertToJavaScript: (props, value) => convertString(props, value),
  convertToMysql: (props, value) => convertString(props, value)
};
