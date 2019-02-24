import { assertNever } from "../../../Util";
import { TableLikeOrTableLikeAlias } from "../../../../TableLike";
import { buildSubQuery } from "./buildSubQuery";
import { buildIdentifier } from "./buildIdentifier";
import { buildTable } from "./buildTable";
export function buildFromPart(
  tableLike: TableLikeOrTableLikeAlias<any>
): string {
  switch (tableLike.kind) {
    case "Table":
      return buildTable(tableLike);
    case "TableLikeAlias":
      return `${buildFromPart(tableLike.table)} AS ${buildIdentifier(
        tableLike.alias
      )}`;
    case "SubQueryTable":
      return buildSubQuery(tableLike.query);
    default:
      return assertNever(tableLike);
  }
}
