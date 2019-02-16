import { SelectOffsetStep } from "./SelectOffsetStep";
import { SelectFinalStep } from "./SelectFinalStep";
import { Row } from "./Row";

export interface SelectLimitStep<R extends Row> extends SelectFinalStep<R> {
  limit(count: number): SelectOffsetStep<R>;
}
