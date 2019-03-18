import { SelectOrderByStep } from "./SelectOrderByStep";
import { Row } from "./Row";
import { Field } from "./Field";
import { TableField } from "./TableField";
import { SelectHavingStep } from "./SelectHavingStep";

export interface SelectGroupByStep<R extends Row> extends SelectHavingStep<R> {
  groupBy(field: Field<any>, ...fields: Field<any>[]): SelectHavingStep<R>;
}
