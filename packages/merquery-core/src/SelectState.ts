import { Table, TableLike, TableLikeOrTableLikeAlias } from "./TableLike";
import { ConditionWithOperator } from "./ConditionWithOperator";
import { FieldCollection } from "./FieldCollection";
import { OrderByWithDirection } from "./OrderByWithDirection";
import { JoinedTableWithOnCondition } from "./JoinedTableWithOnCondition";
import { TemporaryJoinedTable } from "./TemporaryJoinedTable";
import { Row } from "./Row";
import { Field } from "./Field";
import { Condition } from "./Condition";
import { ConditionCollection } from "./ConditionCollection";
import { LockMode } from "./LockMode";
import { OneOrMoreArray } from "./impl/OneOrMoreArray";

export interface SelectState<R extends Row> {
  recordTable?: Table<R>;
  from?: OneOrMoreArray<TableLikeOrTableLikeAlias<any>>;
  condition?: ConditionCollection;
  limit?: number;
  offset?: number;
  groupBy?: OneOrMoreArray<Field<any>>;
  orderBy?: OneOrMoreArray<OrderByWithDirection>;
  temporaryJoinedTable?: TemporaryJoinedTable;
  joins?: OneOrMoreArray<JoinedTableWithOnCondition>;
  columns: Field<any>[];
  having?: Condition;
  lockMode?: LockMode;
}
