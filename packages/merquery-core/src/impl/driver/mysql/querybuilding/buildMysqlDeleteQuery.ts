import { DeleteState } from "../../../../DeleteState";
import { buildTable } from "./buildTable";
import { buildConditions } from "./buildConditions";

export function buildMysqlDeleteQuery(state: DeleteState<any>) {
  let query = `DELETE FROM ${buildTable(state.table)}`;

  if (state.condition) {
    query += ` WHERE ${buildConditions(state.condition)}`;
  }

  return query;
}
