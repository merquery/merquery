import { Condition } from "./Condition";
import { Row } from "./Row";
import { SelectConditionStep } from "./SelectConditionStep";
import { SelectGroupByStep } from "./SelectGroupByStep";

export interface SelectWhereStep<R extends Row> extends SelectGroupByStep<R> {
  where(condition: Condition): SelectConditionStep<R>;
}
