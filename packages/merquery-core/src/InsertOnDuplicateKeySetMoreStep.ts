import { Row } from "./Row";
import { TableField } from "./TableField";
import { InsertFinalStep } from "./InsertFinalStep";

export interface InsertOnDuplicateKeySetMoreStep<R extends Row>
  extends InsertFinalStep<R> {
  set<T>(
    column: TableField<R, T>,
    value: T
  ): InsertOnDuplicateKeySetMoreStep<R>;
}
