import { Table } from "./TableLike";
import { Row } from "./Row";
import { SelectJoinStep } from "./SelectJoinStep";
import { DSLConfig } from "./DSLConfig";
import { ResultQuery } from "./ResultQuery";
import { Field, TableField } from "./Field";
import { SelectFromStep } from "./SelectFromStep";
import { SubQuery } from "./SubQuery";
import { InsertImpl } from "./impl/dsl/InsertImpl";
import { InsertValuesStep1 } from "./InsertValuesStep1";
import { InsertValuesStep2 } from "./InsertValuesStep2";
import { InsertValuesStep3 } from "./InsertValuesStep3";
import { InsertValuesStep } from "./InsertValuesStep";
import { UpdateSetStep } from "./UpdateSetStep";

export interface DSLContext {
  /**
   * Select from a table
   * @param table
   */
  selectFrom<R extends Row>(table: Table<R>): SelectJoinStep<R>;

  /**
   * Select individual columns
   * @param field The first field
   * @param fields Other fields
   */
  select(field: Field<any>, ...fields: Field<any>[]): SelectFromStep<Row>;

  /**
   * @param cb Callback to be run in transaction context. Automatically commits after the returned promise is resolved.
   */
  transaction<R>(cb: (configuration: DSLConfig) => Promise<R>): Promise<R>;

  insertInto<R extends Row, T1>(
    table: Table<R>,
    v1: TableField<R, T1>
  ): InsertValuesStep1<R, T1>;

  insertInto<R extends Row, T1, T2>(
    table: Table<R>,
    v1: TableField<R, T1>,
    v2: TableField<R, T2>
  ): InsertValuesStep2<R, T1, T2>;

  insertInto<R extends Row, T1, T2, T3>(
    table: Table<R>,
    v1: TableField<R, T1>,
    v2: TableField<R, T2>,
    v3: TableField<R, T3>
  ): InsertValuesStep3<R, T1, T2, T3>;

  insertInto<R extends Row>(
    table: Table<R>,
    ...fields: TableField<R, any>[]
  ): InsertValuesStep<R>;

  update<R extends Row>(table: Table<R>): UpdateSetStep<R>;
}
