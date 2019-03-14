import { Row } from "./Row";
import { Table } from "./TableLike";
import { SubQuery } from "./SubQuery";

export interface SubQueryFromPart<R extends Row> {
  kind: "SubQueryFromPart";
  query: SubQuery<R>;
  alias: string;
}

export interface TableFromPart<R extends Row> {
  kind: "TableFromPart";
  table: Table<R>;
  alias?: string;
}

export type FromPart<R extends Row> = SubQueryFromPart<R> | TableFromPart<R>;
