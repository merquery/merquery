import { Row } from "./Row";
import { Table } from "./TableLike";
import { ConditionCollection } from "./Condition";

export interface DeleteState<R extends Row> {
  table: Table<R>;
  condition?: ConditionCollection;
}
