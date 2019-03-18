import { Row } from "./Row";
import { Table } from "./TableLike";
import { ConditionCollection } from "./ConditionCollection";

export interface DeleteState<R extends Row> {
  table: Table<R>;
  condition?: ConditionCollection;
}
