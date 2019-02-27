import { Row } from "./Row";
import { InsertFinalStep } from "./InsertFinalStep";

export interface InsertValuesStep<R extends Row> extends InsertFinalStep<R> {
  values(...values: any[]): InsertValuesStep<R>;
}
