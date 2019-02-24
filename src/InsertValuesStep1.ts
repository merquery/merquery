import { Row } from "./Row";
import { InsertFinalStep } from "./InsertFinalStep";
export interface InsertValuesStep1<R extends Row, T1>
  extends InsertFinalStep<R> {
  values(value1: T1): InsertValuesStep1<R, T1>;
}
