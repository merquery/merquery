import { BaseConverter } from "./BaseConverter";
import { DataTypeDateProps } from "../../../../DataTypeDateProps";
import _ = require("lodash");
import { ConvertResult } from "../../../../ConvertResult";

function convertDate(
  props: DataTypeDateProps,
  value: unknown
): ConvertResult<Date> {
  if (!(value instanceof Date)) {
    return { kind: "ConvertError", reason: "Value is not of type Date" };
  }

  return { kind: "ConvertSuccess", value: value };
}

function convertDateToMysql(
  props: DataTypeDateProps,
  value: unknown
): ConvertResult<string> {
  if (!(value instanceof Date)) {
    return { kind: "ConvertError", reason: "Value is not of type Date" };
  }

  return { kind: "ConvertSuccess", value: value.toISOString() };
}

export const DateConverter: BaseConverter<DataTypeDateProps, Date> = {
  convertToJavaScript: (props, value) => convertDate(props, value),
  convertToMysql: (props, value) => convertDateToMysql(props, value)
};
