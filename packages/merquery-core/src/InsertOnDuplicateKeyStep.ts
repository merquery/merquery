import { Row } from "./Row";
import { TableField } from "./TableField";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeySetStep } from "./InsertOnDuplicateKeySetStep";

export interface InsertOnDuplicateKeyStep<R extends Row>
  extends InsertFinalStep<R> {
  onDuplicateKeyUpdate(): InsertOnDuplicateKeySetStep<R>;
  onDuplicateKeyIgnore(): InsertFinalStep<R>;
}
