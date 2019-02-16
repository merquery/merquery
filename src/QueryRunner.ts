import { SelectState } from "./SelectState";
import { ResultRow } from "./QueryResult";

export interface QueryRunner {
  executeSelectState(query: SelectState<any>): Promise<ResultRow[]>;
  representSelectStateAsSqlString(state: SelectState<any>): string;

  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollBack(): Promise<void>;
  release(): void;
}
