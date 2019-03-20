import { BaseConverter } from "./BaseConverter";
import { DataTypeStringProps, DataTypeEnumProps } from "../../../..";
import { ConvertResult } from "../../../../ConvertResult";
import _ = require("lodash");

function convertEnum<T extends string>(
  dataType: DataTypeEnumProps<T>,
  value: unknown
): ConvertResult<T> {
  if (!_.isString(value)) {
    return { kind: "ConvertError", reason: `Value is not a string` };
  }

  if (!dataType.options.includes(value as T)) {
    return { kind: "ConvertError", reason: `Value is not a valid option` };
  }

  return { kind: "ConvertSuccess", value: value as T };
}

export const EnumConverter: BaseConverter<DataTypeEnumProps<string>, string> = {
  convertToJavaScript: (props, value) => convertEnum(props, value),
  convertToMysql: (props, value) => convertEnum(props, value)
};
