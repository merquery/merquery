import { Table } from "./TableLike";
import { Row } from "./Row";
import { TableField } from "./TableField";
import { ConditionCollection } from "./ConditionCollection";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";
import { TableValueField } from "./TableValueField";

export interface UpdateState<R extends Row> {
  table: Table<R>;
  updates: TableValueField<R, any>[];
  condition?: ConditionCollection;
}
