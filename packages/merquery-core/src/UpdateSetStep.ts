import { Row } from "./Row";
import { TableField } from "./TableField";
import { UpdateSetMoreStep } from "./UpdateSetMoreStep";

export interface UpdateSetStep<R extends Row> {
  set<T>(column: TableField<R, T>, value: T): UpdateSetMoreStep<R>;
}
