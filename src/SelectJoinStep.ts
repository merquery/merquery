import { Row } from "./Row";
import { SelectWhereStep } from "./SelectWhereStep";
import { Table } from "./TableLike";
import { SelectJoinOnStep } from "./SelectJoinOnStep";

export interface SelectJoinStep<R extends Row> extends SelectWhereStep<R> {
  leftJoin(table: Table<any>): SelectJoinOnStep<R>;
}
