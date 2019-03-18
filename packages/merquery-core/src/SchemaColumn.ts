import { DataTypeProps } from "./DataTypeProps";
export interface SchemaColumn {
  schema: string;
  table: string;
  name: string;
  type: DataTypeProps;
}
