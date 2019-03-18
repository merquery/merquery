import { assertNever } from "../../Util";
import { DataTypeProps } from "../../../DataTypeProps";
import { isStringDataType } from "./isStringDataType";
import { isEnumDataType } from "./isEnumDataType";
import { isIntegerDataType } from "./isIntegerDataType";
export function isDataType<T>(typeProps: DataTypeProps, value: unknown): value is T {
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
