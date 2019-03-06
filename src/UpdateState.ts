import { Table } from "./TableLike";
import { Row } from "./Row";
import { TableField } from "./Field";
import { ConditionCollection } from "./Condition";

export interface UpdateState<R extends Row> {
  table: Table<R>;
  updates: [TableField<R, any>, any][];
  condition?: ConditionCollection;
}
