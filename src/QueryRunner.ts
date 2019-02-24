import { SelectState } from "./SelectState";
import { ResultRow } from "./QueryResult";
import { InsertState } from "./InsertState";

export interface QueryRunner {
  executeSelectState(query: SelectState<any>): Promise<ResultRow[]>;
  executeInsertState(query: InsertState<any>): Promise<void>;

  representSelectStateAsSqlString(state: SelectState<any>): string;

  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollBack(): Promise<void>;
  release(): void;
}
