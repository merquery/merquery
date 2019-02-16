import { Row } from "./Row";
import { TableField } from "./Field";
import { SubQuery } from "./SubQuery";

export interface Table<R extends Row> {
  kind: "Table";
  schema: string;
  name: string;
  fields: TableField<R, any>[];
  rowKind: R["__ROW_KIND__"];
}

export interface SubQueryTable<R extends Row> {
  kind: "SubQueryTable";
  query: SubQuery<R>;
}

export type TableLike<R extends Row> = Table<R> | SubQueryTable<R>;

export interface TableLikeAlias<R extends Row> {
  kind: "TableLikeAlias";
  alias: string;
  table: TableLike<R>;
}

export type TableLikeOrTableLikeAlias<R extends Row> =
  | TableLike<R>
  | TableLikeAlias<R>;

export function aliasTable<R extends Row>(
  table: Table<R>,
  alias: string
): TableLikeAlias<R> {
  return {
    kind: "TableLikeAlias",
    table: table,
    alias: alias
  };
}

export function subQueryTable<R extends Row>(
  query: SubQuery<R>,
  alias: string
): TableLikeAlias<R> {
  return {
    kind: "TableLikeAlias",
    table: {
      kind: "SubQueryTable",
      query: query
    },
    alias: alias
  };
}
