import { Row } from "./Row";
import { InsertFinalStep } from "./InsertFinalStep";
import { InsertOnDuplicateKeyStep } from "./InsertOnDuplicateKeyStep";
export interface InsertValuesStep2<R extends Row, T1, T2>
  extends InsertOnDuplicateKeyStep<R> {
  values(value1: T1, value2: T2): InsertValuesStep2<R, T1, T2>;
}
