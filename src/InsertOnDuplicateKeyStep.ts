import { Row } from "./Row";
import { TableField } from "./Field";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeySetStep } from "./InsertOnDuplicateKeySetStep";

export interface InsertOnDuplicateKeyStep<R extends Row>
  extends InsertFinalStep<R> {
  onDuplicateKeyUpdate(): InsertOnDuplicateKeySetStep<R>;
  onDuplicateKeyIgnore(): InsertFinalStep<R>;
}
