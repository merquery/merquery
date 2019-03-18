import { SelectState } from "./SelectState";
import { ResultRow } from "./ResultRow";
import { InsertState } from "./InsertState";
import { UpdateState } from "./UpdateState";
import { DeleteState } from "./DeleteState";

export interface QueryRunner {
  executeSelectState(query: SelectState<any>): Promise<ResultRow[]>;
  executeInsertState(query: InsertState<any>): Promise<void>;
  executeUpdateState(query: UpdateState<any>): Promise<void>;
  executeDeleteState(query: DeleteState<any>): Promise<void>;

  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollBack(): Promise<void>;
  release(): void;
}
