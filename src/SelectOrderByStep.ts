import { TableField } from "./Field";
import { Row } from "./Row";
import { SelectLimitStep } from "./SelectLimitStep";

export interface SelectOrderByStep<R extends Row> extends SelectLimitStep<R> {
  orderByAscending<T>(field: TableField<R, T>): SelectOrderByStep<R>;
  orderByDescending<T>(field: TableField<R, T>): SelectOrderByStep<R>;
}
