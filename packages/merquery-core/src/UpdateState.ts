import { Table } from "./TableLike";
import { Row } from "./Row";
import { TableField } from "./Field";
import { ConditionCollection } from "./Condition";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";
import { Assignment } from "./impl/driver/mysql/querybuilding/buildSetList";

export interface UpdateState<R extends Row> {
  table: Table<R>;
  updates: Assignment<R, any>[];
  condition?: ConditionCollection;
}
