export interface TableFieldOwner {
  kind: "TableFieldOwner";
  schema: string;
  table: string;
}

export interface AliasFieldOwner {
  kind: "AliasFieldOwner";
  alias: string;
}

export type FieldOwner = TableFieldOwner | AliasFieldOwner;
