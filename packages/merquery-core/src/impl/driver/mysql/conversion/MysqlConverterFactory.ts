import { DataTypeProps } from "../../../../DataTypeProps";
import { BaseConverter } from "./BaseConverter";
import { DateConverter } from "./DateConverter";
import { EnumConverter } from "./EnumConverter";
import { IntegerConverter } from "./IntegerConverter";
import { StringConverter } from "./StringConverter";

export function MysqlConverterFactory(
  props: DataTypeProps
): BaseConverter<DataTypeProps, any> {
  switch (props.type) {
    case "DATE":
      return DateConverter;
    case "ENUM":
      return EnumConverter;
    case "INTEGER":
      return IntegerConverter;
    case "STRING":
      return StringConverter;
  }
}
