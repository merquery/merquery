import { TableField, Field } from "./Field";

export interface Row {
  __ROW_KIND__: string;
}

export interface ColumnIndexRow extends Row {
  fields: Field<any>[];
}

export interface Row1<T0> extends ColumnIndexRow {
  f0: T0;
}
