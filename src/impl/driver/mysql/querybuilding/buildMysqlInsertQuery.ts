import { InsertState } from "../../../../InsertState";
import { buildField } from "./buildField";
import { buildTable } from "./buildTable";
import { Field } from "../../../../Field";

export function buildValue(values: Field<any>[]) {
  return `(${values.map(buildField).join(", ")})`;
}

export function buildMysqlInsertQuery(state: InsertState<any>) {
  let query = "";

  if (state.values.length === 0) throw new Error("Insert clause had no values");

  query += `INSERT INTO ${buildTable(state.table)}`;
  query += ` VALUES ${state.values.map(buildValue).join(", ")}`;

  return query;
}
