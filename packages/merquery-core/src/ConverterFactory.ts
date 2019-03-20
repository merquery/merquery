import { DataTypeProps } from "./DataTypeProps";
import { BaseConverter } from "./impl/driver/mysql/conversion/BaseConverter";

export type ConverterFactory = (
  props: DataTypeProps
) => BaseConverter<DataTypeProps, any>;
