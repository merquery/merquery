import { Row } from "./Row";
import { TableLikeOrTableLikeAlias } from "./TableLike";
import { SelectJoinStep } from "./SelectJoinStep";
export interface SelectFromStep<R extends Row> extends SelectJoinStep<R> {
  from(
    table: TableLikeOrTableLikeAlias<any>,
    ...tables: TableLikeOrTableLikeAlias<any>[]
  ): SelectJoinStep<R>;
}
