import { Table, TableLike, TableLikeOrTableLikeAlias } from "./TableLike";
import { ConditionWithOperator } from "./ConditionWithOperator";
import { FieldCollection } from "./FieldCollection";
import { OrderByWithDirection } from "./OrderByWithDirection";
import {
  TemporaryJoinedTable,
  JoinedTableWithOnCondition
} from "./JoinedTable";
import { Row } from "./Row";
import { Field } from "./Field";
import { FromPart } from "./FromPart";
import { ConditionCollection } from "./Condition";

export interface SelectState<R extends Row> {
  recordTable?: Table<R>;
  from: TableLikeOrTableLikeAlias<any>[];
  condition?: ConditionCollection;
  limit?: number;
  offset?: number;
  groupBy?: FieldCollection;
  orderBy: OrderByWithDirection[];
  temporaryJoinedTable?: TemporaryJoinedTable;
  joins: JoinedTableWithOnCondition[];
  columns: Field<any>[];
}
