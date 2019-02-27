import { TableLikeOrTableLikeAlias } from "../../../../TableLike";
import { buildFromPart } from "./buildFromPart";
export function buildFromPartList(tables: TableLikeOrTableLikeAlias<any>[]) {
  return tables.map(buildFromPart).join(", ");
}
