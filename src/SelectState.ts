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
import { ConditionCollection, Condition } from "./Condition";
import { LockMode } from "./LockMode";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";

export interface SelectState<R extends Row> {
  recordTable?: Table<R>;
  from: TableLikeOrTableLikeAlias<any>[];
  condition?: ConditionCollection;
  limit?: number;
  offset?: number;
  groupBy: Field<any>[];
  orderBy: OrderByWithDirection[];
  temporaryJoinedTable?: TemporaryJoinedTable;
  joins?: OneOrMoreArray<JoinedTableWithOnCondition>;
  columns: Field<any>[];
  having?: Condition;
  lockMode?: LockMode;
}
