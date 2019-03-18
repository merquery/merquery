import { Row } from "./Row";
import { Condition } from "./Condition";
import { DeleteFinalStep } from "./DeleteFinalStep";

export interface DeleteConditionStep<R extends Row> extends DeleteFinalStep<R> {
  and(condition: Condition): DeleteConditionStep<R>;
  or(condition: Condition): DeleteConditionStep<R>;
}
