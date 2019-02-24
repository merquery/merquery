import { Row } from "./Row";
import { InsertFinalStep } from "./InsertFinalStep";
export interface InsertValuesStep2<R extends Row, T1, T2>
  extends InsertFinalStep<R> {
  values(value1: T1, value2: T2): InsertValuesStep2<R, T1, T2>;
}
