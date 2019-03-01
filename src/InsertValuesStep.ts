import { Row } from "./Row";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeyStep } from "./InsertOnDuplicateKeyStep";

export interface InsertValuesStep<R extends Row>
  extends InsertOnDuplicateKeyStep<R> {
  values(...values: any[]): InsertValuesStep<R>;
}
