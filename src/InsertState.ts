import { Row } from "./Row";
import { Table } from "./TableLike";
import { TableField, Field } from "./Field";
export interface InsertState<R extends Row> {
  table: Table<R>;
  fields: TableField<R, any>[];
  values: Field<any>[][];
}
