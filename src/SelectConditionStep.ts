import { Condition } from "./Condition";
import { Row } from "./Row";
import { SelectFinalStep } from "./SelectFinalStep";
import { SelectGroupByStep } from "./SelectGroupByStep";

export interface SelectConditionStep<R extends Row>
  extends SelectGroupByStep<R> {
  and(condition: Condition): SelectConditionStep<R>;
  or(condition: Condition): SelectConditionStep<R>;
}
