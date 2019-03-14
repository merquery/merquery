import { Row } from "./Row";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeyStep } from "./InsertOnDuplicateKeyStep";
export interface InsertValuesStep1<R extends Row, T1>
  extends InsertOnDuplicateKeyStep<R> {
  values(value1: T1): InsertValuesStep1<R, T1>;
}
