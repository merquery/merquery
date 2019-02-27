import { Row } from "../../../../Row";
import { Table } from "../../../../TableLike";
import { buildIdentifier } from "./buildIdentifier";
export function buildTable<R extends Row>(table: Table<R>) {
  return buildIdentifier(table.schema, table.name);
}
