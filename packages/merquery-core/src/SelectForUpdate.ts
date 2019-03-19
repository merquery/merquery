import { Row } from "./Row";
import { SelectFinalStep } from "./SelectFinalStep";

export interface SelectForUpdate<R extends Row> extends SelectFinalStep<R> {
  forUpdate(): SelectFinalStep<R>;
  lockInShareMode(): SelectFinalStep<R>;
}
