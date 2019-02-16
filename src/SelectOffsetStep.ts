import { Row } from "./Row";
import { SelectFinalStep } from "./SelectFinalStep";

export interface SelectOffsetStep<R extends Row> extends SelectFinalStep<R> {
  offset(count: number): SelectFinalStep<R>;
}
