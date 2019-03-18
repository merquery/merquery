import { TableLikeOrTableLikeAlias } from "./TableLike";
import { JoinType } from "./JoinType";
export interface TemporaryJoinedTable {
  table: TableLikeOrTableLikeAlias<any>;
  joinType: JoinType;
}
