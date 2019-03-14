import { InsertState } from "../../../../InsertState";
import { buildTable } from "./buildTable";
import { buildValueList } from "./buildValueList";

export function buildMysqlInsertQuery(state: InsertState<any>) {
  let query = "";

  if (state.values.length === 0) throw new Error("Insert clause had no values");

  query += `INSERT INTO ${buildTable(state.table)}`;
  query += ` VALUES ${state.values.map(buildValueList).join(", ")}`;

  return query;
}
