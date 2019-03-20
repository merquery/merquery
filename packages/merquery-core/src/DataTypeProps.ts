import { DataTypeIntegerProps } from "./DataTypeIntegerProps";
import { DataTypeEnumProps } from "./DataTypeEnumProps";
import { DataTypeStringProps } from "./DataTypeStringProps";
import { DataTypeDateProps } from "./DataTypeDateProps";
export type DataTypeProps =
  | DataTypeIntegerProps
  | DataTypeEnumProps<any>
  | DataTypeStringProps
  | DataTypeDateProps;
