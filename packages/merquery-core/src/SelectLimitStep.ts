import { SelectOffsetStep } from "./SelectOffsetStep";
import { SelectFinalStep } from "./SelectFinalStep";
import { Row } from "./Row";
import { SelectForUpdate } from "./SelectForUpdate";

export interface SelectLimitStep<R extends Row> extends SelectForUpdate<R> {
  limit(count: number): SelectOffsetStep<R>;
}
