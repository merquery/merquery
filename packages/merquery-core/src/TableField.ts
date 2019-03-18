import { Row } from "./Row";
import { DataTypeProps } from "./DataTypeProps";
import { FieldOwner } from "./FieldOwner";
export interface TableField<R extends Row, T> {
  kind: "TableField";
  table: FieldOwner;
  column: string;
  type: DataTypeProps;
  rowKind: R["__ROW_KIND__"];
}
