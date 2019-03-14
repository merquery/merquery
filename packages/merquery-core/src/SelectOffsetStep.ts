import { Row } from "./Row";
import { SelectFinalStep } from "./SelectFinalStep";
import { SelectForUpdate } from "./SelectForUpdate";

export interface SelectOffsetStep<R extends Row> extends SelectForUpdate<R> {
  offset(count: number): SelectForUpdate<R>;
}
