import { Row } from "./Row";
import _ = require("lodash");
import { assertNever } from "./impl/Util";

export interface DataTypeIntegerProps {
  type: "INTEGER";
  length: number;
  signed: boolean;
}

export interface DataTypeEnumProps<T extends string> {
  type: "ENUM";
  options: T[];
}

export interface DataTypeStringProps {
  type: "STRING";
}

export type DataTypeProps =
  | DataTypeIntegerProps
  | DataTypeEnumProps<any>
  | DataTypeStringProps;

export function isDataType<T>(
  typeProps: DataTypeProps,
  value: unknown
): value is T {
  switch (typeProps.type) {
    case "ENUM":
      return isEnumDataType(typeProps, value);
    case "INTEGER":
      return isIntegerDataType(typeProps, value);
    case "STRING":
      return isStringDataType(typeProps, value);

    default:
      return assertNever(typeProps);
  }
}

export function isIntegerDataType(
  typeProps: DataTypeIntegerProps,
  value: unknown
) {
  if (!_.isNumber(value) || !_.isFinite(value) || !_.isSafeInteger(value))
    return false;

  if (!typeProps.signed && value < 0) return false;

  return true;
}

export function isEnumDataType<T extends string>(
  props: DataTypeEnumProps<T>,
  value: unknown
): value is T {
  if (!_.isString(value)) return false;

  return props.options.indexOf(value as T) !== -1;
}

export function isStringDataType(props: DataTypeStringProps, value: unknown) {
  if (!_.isString(value)) return false;
  return true;
}
