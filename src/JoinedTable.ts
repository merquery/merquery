import { Table } from "./TableLike";
import { JoinType } from "./JoinType";
import { Condition } from "./Condition";

export interface TemporaryJoinedTable {
  table: Table<any>;
  joinType: JoinType;
}

export interface JoinedTableWithOnCondition extends TemporaryJoinedTable {
  condition: Condition;
}
