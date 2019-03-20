import { DataTypeProps } from "./DataTypeProps";
import { ConvertResult } from "./ConvertResult";
export type Converter = (
  type: DataTypeProps,
  value: unknown
) => ConvertResult<any>;
