import { Row } from "./Row";
import { TableField } from "./TableField";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeySetMoreStep } from "./InsertOnDuplicateKeySetMoreStep";

export interface InsertOnDuplicateKeySetStep<R extends Row> {
  set<T>(
    column: TableField<R, T>,
    value: T
  ): InsertOnDuplicateKeySetMoreStep<R>;
}
