import { Row } from "./Row";
import { Table } from "./TableLike";
import { TableField, Field, ValueField } from "./Field";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";

interface OnDuplicateKeyIgnore {
  kind: "OnDuplicateKeyIgnore";
}

interface OnDuplicateKeyUpdate<R extends Row> {
  kind: "OnDuplicateKeyUpdate";
  updates: [TableField<R, any>, any][];
}

export interface InsertState<R extends Row> {
  table: Table<R>;
  fields: TableField<R, any>[];
  values: OneOrMoreArray<ValueField<any>>[];
  duplicateKey?: OnDuplicateKeyIgnore | OnDuplicateKeyUpdate<R>;
}
