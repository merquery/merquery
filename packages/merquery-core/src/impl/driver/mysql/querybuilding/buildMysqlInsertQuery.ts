import { InsertState } from "../../../../InsertState";
import { buildTable } from "./buildTable";
import { buildFieldList } from "./buildValueList";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";
import { buildSetList } from "./buildSetList";

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

  query += ` INTO ${buildTable(state.table)} ${buildFieldList(state.fields)}`;
  query += ` VALUES ${state.values
    .map(vals => {
      if (vals.length !== state.fields.length)
        throw new Error("Mismatching field count between fields and values.");

      return buildFieldList(vals);
    })
    .join(", ")}`;

  if (
    state.duplicateKey &&
    state.duplicateKey.kind === "OnDuplicateKeyUpdate"
  ) {
    query += ` ON DUPLICATE KEY UPDATE ${buildSetList(
      OneOrMoreArrayUtil.fromArray(state.duplicateKey.updates)
    )}`;
  }

  return query;
}
