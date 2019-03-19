import { DataTypeIntegerProps } from "./DataTypeIntegerProps";
import { DataTypeEnumProps } from "./DataTypeEnumProps";
import { DataTypeStringProps } from "./DataTypeStringProps";
export type DataTypeProps = DataTypeIntegerProps | DataTypeEnumProps<any> | DataTypeStringProps;
