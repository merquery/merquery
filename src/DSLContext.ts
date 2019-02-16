import { Table } from "./TableLike";
import { Row } from "./Row";
import { SelectJoinStep } from "./SelectJoinStep";
import { DSLConfig } from "./DSLConfig";
import { ResultQuery } from "./ResultQuery";
import { Field, TableField } from "./Field";
import { SelectFromStep } from "./SelectFromStep";
import { SubQuery } from "./SubQuery";

export interface DSLContext {
  selectFrom<R extends Row>(table: Table<R>): SelectJoinStep<R>;

  /**
   * Select individual columns
   * @param fields - Fields to select
   */
  select(...fields: Field<any>[]): SelectFromStep<Row>;

  transaction<R>(cb: (configuration: DSLConfig) => Promise<R>): Promise<R>;
}
