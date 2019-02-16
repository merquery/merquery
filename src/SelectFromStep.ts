import { Row } from "./Row";
import { TableLike, TableLikeOrTableLikeAlias } from "./TableLike";
import { SelectWhereStep } from "./SelectWhereStep";
export interface SelectFromStep<R extends Row> extends SelectWhereStep<R> {
  from(table: TableLikeOrTableLikeAlias<any>): SelectFromStep<R>;
}
