import { SelectState } from "./SelectState";
import { InsertState } from "./InsertState";
import { UpdateState } from "./UpdateState";
import { DeleteState } from "./DeleteState";

export interface QueryBuilder {
  representSelectStateAsSqlString(state: SelectState<any>): string;
  representInsertStateAsSqlString(state: InsertState<any>): string;
  representUpdateStateAsSqlString(state: UpdateState<any>): string;
  representDeleteStateAsSqlString(state: DeleteState<any>): string;
}
