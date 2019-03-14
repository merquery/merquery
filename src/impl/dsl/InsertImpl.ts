import { Table } from "../../TableLike";
import { Row } from "../../Row";
import { TableField, Field, val, ValueField } from "../../Field";
import { InsertState } from "../../InsertState";
import { InsertValuesStep1 } from "../../InsertValuesStep1";
import { InsertValuesStep2 } from "../../InsertValuesStep2";
import { InsertValuesStep3 } from "../../InsertValuesStep3";
import { InsertFinalStep } from "../../InsertFinalStep";
import { QueryRunner } from "../../QueryRunner";
import { SubQuery } from "../../SubQuery";
import { InsertOnDuplicateKeySetStep } from "../../InsertOnDuplicateKeySetStep";
import { InsertOnDuplicateKeyStep } from "../../InsertOnDuplicateKeyStep";
import { InsertOnDuplicateKeySetMoreStep } from "../../InsertOnDuplicateKeySetMoreStep";
import { OneOrMoreArrayUtil } from "../OneOrMoreArray";

export class InsertImpl<R extends Row, T1 = any, T2 = any, T3 = any>
  implements
    InsertValuesStep1<R, T1>,
    InsertValuesStep2<R, T1, T2>,
    InsertValuesStep3<R, T1, T2, T3>,
    InsertOnDuplicateKeySetStep<R>,
    InsertOnDuplicateKeyStep<R>,
    InsertOnDuplicateKeySetMoreStep<R>,
    InsertFinalStep<R> {
  constructor(
    private state: InsertState<R>,
    private queryRunner: QueryRunner
  ) {}
  asSqlString(): string {
    return this.queryRunner.representInsertStateAsSqlString(this.state);
  }

  onDuplicateKeyUpdate() {
    return this.create({
      ...this.state,
      duplicateKey: {
        kind: "OnDuplicateKeyUpdate",
        updates: []
      }
    });
  }
  onDuplicateKeyIgnore() {
    return this.create({
      ...this.state,
      duplicateKey: {
        kind: "OnDuplicateKeyIgnore"
      }
    });
  }
  set<T>(column: TableField<R, T>, value: T) {
    if (
      !this.state.duplicateKey ||
      this.state.duplicateKey.kind !== "OnDuplicateKeyUpdate"
    )
      throw new Error("Invalid state");

    return this.create({
      ...this.state,
      duplicateKey: {
        ...this.state.duplicateKey,
        updates: [...this.state.duplicateKey.updates, [column, value]]
      }
    });
  }

  execute(): Promise<void> {
    return this.queryRunner.executeInsertState(this.state);
  }

  values(...values: any[]): InsertImpl<R, T1, T2, T3> {
    return this.addValues(values);
  }

  private addFields(values: ValueField<any>[]) {
    return this.create({
      ...this.state,
      values: [...this.state.values, OneOrMoreArrayUtil.fromArray(values)]
    });
  }

  private addValues(valuesArr: any[]) {
    return this.addFields(valuesArr.map(val));
  }

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
