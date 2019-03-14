import { Row } from "./Row";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeyStep } from "./InsertOnDuplicateKeyStep";

export interface InsertValuesStep3<R extends Row, T1, T2, T3>
  extends InsertOnDuplicateKeyStep<R> {
  values(value1: T1, value2: T2, value3: T3): InsertValuesStep3<R, T1, T2, T3>;
}
