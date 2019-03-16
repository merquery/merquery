import { InsertState } from "../../../../InsertState";
import { buildTable } from "./buildTable";
import { buildFieldList } from "./buildValueList";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";
import { buildOnDuplicateKeyUpdate } from "./buildOnDuplicateKeyUpdate";
export function buildMysqlInsertQuery(state: InsertState<any>) {
  let query = "";

  if (state.values.length === 0) throw new Error("Insert clause had no values");

  query += "INSERT";
  if (
    state.duplicateKey &&
    state.duplicateKey.kind === "OnDuplicateKeyIgnore"
  ) {
    query += " IGNORE";
  }

  query += ` INTO ${buildTable(state.table)} ${buildFieldList(
    OneOrMoreArrayUtil.fromArray(state.fields)
  )}`;
  query += ` VALUES ${state.values.map(buildFieldList).join(", ")}`;

  if (
    state.duplicateKey &&
    state.duplicateKey.kind === "OnDuplicateKeyUpdate"
  ) {
    query += ` ON DUPLICATE KEY ${buildOnDuplicateKeyUpdate(
      state.duplicateKey
    )}`;
  }

  return query;
}
