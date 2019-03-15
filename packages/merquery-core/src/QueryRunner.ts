import { SelectState } from "./SelectState";
import { ResultRow } from "./QueryResult";
import { InsertState } from "./InsertState";
import { UpdateState } from "./UpdateState";

export interface QueryRunner {
  executeSelectState(query: SelectState<any>): Promise<ResultRow[]>;
  executeInsertState(query: InsertState<any>): Promise<void>;
  executeUpdateState(query: UpdateState<any>): Promise<void>;

  representSelectStateAsSqlString(state: SelectState<any>): string;
  representInsertStateAsSqlString(state: InsertState<any>): string;
  representUpdateStateAsSqlString(state: UpdateState<any>): string;

  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollBack(): Promise<void>;
  release(): void;
}
