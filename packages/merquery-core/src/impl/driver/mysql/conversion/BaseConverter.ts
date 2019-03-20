import { DataTypeProps } from "../../../../DataTypeProps";
import { ConvertResult } from "../../../../ConvertResult";

export interface BaseConverter<T extends DataTypeProps, TRes> {
  convertToJavaScript(props: T, value: unknown): ConvertResult<TRes>;
  convertToMysql(props: T, value: unknown): ConvertResult<string | number>;
}
