import { Table } from "../../TableLike";
import { Row } from "../../Row";
import { TableField, Field, val } from "../../Field";
import { InsertState } from "../../InsertState";
import { InsertValuesStep1 } from "../../InsertValuesStep1";
import { InsertValuesStep2 } from "../../InsertValuesStep2";
import { InsertValuesStep3 } from "../../InsertValuesStep3";
import { InsertFinalStep } from "../../InsertFinalStep";
import { QueryRunner } from "../../QueryRunner";
import { SubQuery } from "../../SubQuery";

export class InsertImpl<R extends Row, T1 = any, T2 = any, T3 = any>
  implements
    InsertValuesStep1<R, T1>,
    InsertValuesStep2<R, T1, T2>,
    InsertValuesStep3<R, T1, T2, T3>,
    InsertFinalStep<R> {
  asSubQuery(): SubQuery<R> {
    throw new Error("Method not implemented.");
  }

  execute(): Promise<void> {
    return this.queryRunner.executeInsertState(this.state);
  }

  values(...values: any[]): InsertImpl<R, T1, T2, T3> {
    return this.addValues(values);
  }

  private addFields(...values: Field<any>[]) {
    return this.create({
      ...this.state,
      values: [...this.state.values, values]
    });
  }

  private addValues(...values: any[]) {
    return this.addFields(...values.map(val));
  }

  constructor(
    private state: InsertState<R>,
    private queryRunner: QueryRunner
  ) {}

  static initial<R extends Row>(
    queryRunner: QueryRunner,
    table: Table<R>,
    ...fields: TableField<R, any>[]
  ) {
    return new InsertImpl(
      {
        table: table,
        fields: fields,
        values: []
      },
      queryRunner
    );
  }

  private create(state: InsertState<R>) {
    return new InsertImpl<R, T1, T2, T3>(state, this.queryRunner);
  }
}
