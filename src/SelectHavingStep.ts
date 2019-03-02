import { Row } from "./Row";
import { Condition } from "./Condition";
import { SelectOrderByStep } from "./SelectOrderByStep";

export interface SelectHavingStep<R extends Row> extends SelectOrderByStep<R> {
  having(condition: Condition): SelectOrderByStep<R>;
}
