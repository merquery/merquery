import { TableField, Field } from "./Field";

export interface Row {
  // Just for typing purposes
  __ROW_KIND__: string;
  __ROW_GUARD__: boolean;
}

export interface ColumnIndexRow extends Row {
  fields: Field<any>[];
}

export interface Row1<T0> extends ColumnIndexRow {
  f0: T0;
}
