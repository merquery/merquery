import { Row } from "./Row";
import { Condition } from "./Condition";
import { DeleteConditionStep } from "./DeleteConditionStep";
import { DeleteFinalStep } from "./DeleteFinalStep";

export interface DeleteWhereStep<R extends Row> {
  where(condition: Condition): DeleteConditionStep<R>;
  withoutWhere(): DeleteFinalStep<R>;
}
