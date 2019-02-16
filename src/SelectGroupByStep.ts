import { SelectOrderByStep } from "./SelectOrderByStep";
import { Row } from "./Row";
import { TableField, Field } from "./Field";

export interface SelectGroupByStep<R extends Row> extends SelectOrderByStep<R> {
  groupBy(...fields: Field<any>[]): SelectGroupByStep<R>;
}
