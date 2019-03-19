import { Row } from "./Row";
import { SelectJoinStep } from "./SelectJoinStep";
import { Condition } from "./Condition";
export interface SelectJoinOnStep<R extends Row> {
  on(condition: Condition): SelectJoinStep<R>;
}
