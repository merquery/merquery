import { SchemaTable } from "./SchemaTable";
export interface Schema {
  /**
   * Fetch tables of schema
   */
  fetchTables(): Promise<SchemaTable[]>;
}
