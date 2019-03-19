import { JoinedTableWithOnCondition } from "../../../../JoinedTableWithOnCondition";
import { buildTableLike } from "./buildTableLike";
import { buildJoinType } from "./buildJoinType";
import { buildCondition } from "./buildCondition";

export function buildJoinedTableWithOnCondition(e: JoinedTableWithOnCondition) {
  return `${buildJoinType(e.joinType)} JOIN ${buildTableLike(
    e.table
  )} ON (${buildCondition(e.condition, 0)})`;
}
