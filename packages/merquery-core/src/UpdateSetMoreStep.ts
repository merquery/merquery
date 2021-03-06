import { Row } from "./Row";
import { TableField } from "./TableField";
import { UpdateWhereStep } from "./UpdateWhereStep";

export interface UpdateSetMoreStep<R extends Row> extends UpdateWhereStep<R> {
  set<T>(column: TableField<R, T>, value: T): UpdateSetMoreStep<R>;
}
