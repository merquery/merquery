import { SchemaColumn } from "./SchemaColumn";
export interface SchemaTable {
  schema: string;
  name: string;
  columns: SchemaColumn[];
}
