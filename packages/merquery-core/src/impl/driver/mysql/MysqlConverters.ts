import { Converters } from "../../../Converters";
import { DateConverter } from "./conversion/DateConverter";
import { EnumConverter } from "./conversion/EnumConverter";
import { IntegerConverter } from "./conversion/IntegerConverter";
import { StringConverter } from "./conversion/StringConverter";

export const MysqlConverters: Converters = {
  date: DateConverter,
  enum: EnumConverter,
  integer: IntegerConverter,
  string: StringConverter
};
