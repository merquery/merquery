import { BaseConverter } from "./impl/driver/mysql/conversion/BaseConverter";
import { DataTypeDateProps } from "./DataTypeDateProps";
import { DataTypeEnumProps } from "./DataTypeEnumProps";
import { DataTypeIntegerProps } from "./DataTypeIntegerProps";
import { DataTypeStringProps } from "./DataTypeStringProps";

export interface Converters {
  date: BaseConverter<DataTypeDateProps, Date>;
  enum: BaseConverter<DataTypeEnumProps<string>, string>;
  integer: BaseConverter<DataTypeIntegerProps, number>;
  string: BaseConverter<DataTypeStringProps, string>;
}
