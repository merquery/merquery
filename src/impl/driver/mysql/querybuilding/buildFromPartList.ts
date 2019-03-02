import { TableLikeOrTableLikeAlias } from "../../../../TableLike";
import { buildTableLike } from "./buildTableLike";
export function buildFromPartList(tables: TableLikeOrTableLikeAlias<any>[]) {
  return tables.map(buildTableLike).join(", ");
}
