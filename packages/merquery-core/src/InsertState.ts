import { Row } from "./Row";
import { Table } from "./TableLike";
import { TableField, Field, ValueField } from "./Field";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";

export interface OnDuplicateKeyIgnore {
  kind: "OnDuplicateKeyIgnore";
}

export interface OnDuplicateKeyUpdate<R extends Row> {
  kind: "OnDuplicateKeyUpdate";
  updates: [TableField<R, any>, any][];
}

export type OnDuplicateKey = OnDuplicateKeyIgnore | OnDuplicateKeyUpdate<any>;

export interface InsertState<R extends Row> {
  table: Table<R>;
  fields: TableField<R, any>[];
  values: OneOrMoreArray<ValueField<any>>[];
  duplicateKey?: OnDuplicateKey;
}
