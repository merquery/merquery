import { Row } from "./Row";
import { Condition } from "./Condition";
import { UpdateConditionStep } from "./UpdateConditionStep";
import { UpdateFinalStep } from "./UpdateFinalStep";

export interface UpdateWhereStep<R extends Row> {
  where(condition: Condition): UpdateConditionStep<R>;
  withoutWhere(): UpdateFinalStep<R>;
}
