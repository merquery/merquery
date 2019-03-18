import { Row } from "./Row";
import { Table } from "./TableLike";
import { Field } from "./Field";
import { ValueField } from "./ValueField";
import { TableField } from "./TableField";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";
import { Assignment } from "./impl/driver/mysql/querybuilding/buildSetList";

export interface OnDuplicateKeyIgnore {
  kind: "OnDuplicateKeyIgnore";
}

export interface OnDuplicateKeyUpdate<R extends Row> {
  kind: "OnDuplicateKeyUpdate";
  updates: Assignment<R, any>[];
}

export type OnDuplicateKey = OnDuplicateKeyIgnore | OnDuplicateKeyUpdate<any>;

export interface InsertState<R extends Row> {
  table: Table<R>;
  fields: TableField<R, any>[];
  values: ValueField<any>[][];
  duplicateKey?: OnDuplicateKey;
}
