import { Row } from "./Row";
import { TableField } from "./Field";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeySetMoreStep } from "./InsertOnDuplicateKeySetMoreStep";

export interface InsertOnDuplicateKeySetStep<R extends Row> {
  set<T>(
    column: TableField<R, T>,
    value: T
  ): InsertOnDuplicateKeySetMoreStep<R>;
}
