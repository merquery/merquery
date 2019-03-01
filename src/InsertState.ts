import { Row } from "./Row";
import { Table } from "./TableLike";
import { TableField, Field } from "./Field";

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
  values: Field<any>[][];
  duplicateKey?: OnDuplicateKeyIgnore | OnDuplicateKeyUpdate<R>;
}
