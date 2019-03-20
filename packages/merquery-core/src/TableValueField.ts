import { Row } from "./Row";
import { TableField } from ".";

export interface TableValueField<R extends Row, T> {
  kind: "TableValueField";
  value: T;
  tableField: TableField<R, T>;
}
