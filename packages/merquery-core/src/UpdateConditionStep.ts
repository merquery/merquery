import { Row } from "./Row";
import { Condition } from "./Condition";
import { UpdateFinalStep } from "./UpdateFinalStep";

export interface UpdateConditionStep<R extends Row> extends UpdateFinalStep<R> {
  and(condition: Condition): UpdateConditionStep<R>;
  or(condition: Condition): UpdateConditionStep<R>;
}
