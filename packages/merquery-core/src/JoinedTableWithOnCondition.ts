import { Condition } from "./Condition";
import { TemporaryJoinedTable } from "./TemporaryJoinedTable";
export interface JoinedTableWithOnCondition extends TemporaryJoinedTable {
  condition: Condition;
}
