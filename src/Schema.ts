import { DataTypeProps } from "./DataType";
export interface SchemaColumn {
  schema: string;
  table: string;
  name: string;
  type: DataTypeProps;
}

export interface SchemaTable {
  schema: string;
  name: string;
  columns: SchemaColumn[];
}

export interface Schema {
  fetchTables(): Promise<SchemaTable[]>;
}
