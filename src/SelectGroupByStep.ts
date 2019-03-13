import { SelectOrderByStep } from "./SelectOrderByStep";
import { Row } from "./Row";
import { TableField, Field } from "./Field";
import { SelectHavingStep } from "./SelectHavingStep";

export interface SelectGroupByStep<R extends Row> extends SelectHavingStep<R> {
  groupBy(field: Field<any>, ...fields: Field<any>[]): SelectHavingStep<R>;
}
