import { InsertState } from "../../../../InsertState";
import { buildTable } from "./buildTable";
import { buildFieldList } from "./buildValueList";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export function buildMysqlInsertQuery(state: InsertState<any>) {
  let query = "";

  if (state.values.length === 0) throw new Error("Insert clause had no values");

  query += `INSERT INTO ${buildTable(state.table)} ${buildFieldList(
    OneOrMoreArrayUtil.fromArray(state.fields)
  )}`;
  query += ` VALUES ${state.values.map(buildFieldList).join(", ")}`;

  return query;
}
