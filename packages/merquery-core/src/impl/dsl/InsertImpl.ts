import { Table } from "../../TableLike";
import { Row } from "../../Row";
import { TableField, Field, val, ValueField } from "../../Field";
import { InsertState } from "../../InsertState";
import { InsertFinalStep } from "../../InsertFinalStep";
import { QueryRunner } from "../../QueryRunner";
import { SubQuery } from "../../SubQuery";
import { InsertOnDuplicateKeySetStep } from "../../InsertOnDuplicateKeySetStep";
import { InsertOnDuplicateKeyStep } from "../../InsertOnDuplicateKeyStep";
import { InsertOnDuplicateKeySetMoreStep } from "../../InsertOnDuplicateKeySetMoreStep";
import { OneOrMoreArrayUtil } from "../OneOrMoreArray";
import {
  InsertValuesStep1,
  InsertValuesStep2,
  InsertValuesStep3,
  InsertValuesStep4,
  InsertValuesStep5,
  InsertValuesStep6,
  InsertValuesStep7,
  InsertValuesStep8,
  InsertValuesStep9,
  InsertValuesStep10,
  InsertValuesStep11,
  InsertValuesStep12,
  InsertValuesStep13,
  InsertValuesStep14,
  InsertValuesStep15,
  InsertValuesStep16,
  InsertValuesStep17,
  InsertValuesStep18,
  InsertValuesStep19,
  InsertValuesStep20,
  InsertValuesStep21,
  InsertValuesStep22,
  InsertValuesStep23,
  InsertValuesStep24,
  InsertValuesStep25,
  InsertValuesStep26,
  InsertValuesStep27,
  InsertValuesStep28,
  InsertValuesStep29,
  InsertValuesStep30
} from "../../InsertValuesStepN";

export class InsertImpl<
  R extends Row,
  T1 = any,
  T2 = any,
  T3 = any,
  T4 = any,
  T5 = any,
  T6 = any,
  T7 = any,
  T8 = any,
  T9 = any,
  T10 = any,
  T11 = any,
  T12 = any,
  T13 = any,
  T14 = any,
  T15 = any,
  T16 = any,
  T17 = any,
  T18 = any,
  T19 = any,
  T20 = any,
  T21 = any,
  T22 = any,
  T23 = any,
  T24 = any,
  T25 = any,
  T26 = any,
  T27 = any,
  T28 = any,
  T29 = any,
  T30 = any
>
  implements
    InsertValuesStep1<R, T1>,
    InsertValuesStep2<R, T1, T2>,
    InsertValuesStep3<R, T1, T2, T3>,
    InsertValuesStep4<R, T1, T2, T3, T4>,
    InsertValuesStep5<R, T1, T2, T3, T4, T5>,
    InsertValuesStep6<R, T1, T2, T3, T4, T5, T6>,
    InsertValuesStep7<R, T1, T2, T3, T4, T5, T6, T7>,
    InsertValuesStep8<R, T1, T2, T3, T4, T5, T6, T7, T8>,
    InsertValuesStep9<R, T1, T2, T3, T4, T5, T6, T7, T8, T9>,
    InsertValuesStep10<R, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>,
    InsertValuesStep11<R, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>,
    InsertValuesStep12<R, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>,
    InsertValuesStep13<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13
    >,
    InsertValuesStep14<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14
    >,
    InsertValuesStep15<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15
    >,
    InsertValuesStep16<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16
    >,
    InsertValuesStep17<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17
    >,
    InsertValuesStep18<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18
    >,
    InsertValuesStep19<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19
    >,
    InsertValuesStep20<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20
    >,
    InsertValuesStep21<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21
    >,
    InsertValuesStep22<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22
    >,
    InsertValuesStep23<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23
    >,
    InsertValuesStep24<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23,
      T24
    >,
    InsertValuesStep25<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23,
      T24,
      T25
    >,
    InsertValuesStep26<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23,
      T24,
      T25,
      T26
    >,
    InsertValuesStep27<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23,
      T24,
      T25,
      T26,
      T27
    >,
    InsertValuesStep28<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23,
      T24,
      T25,
      T26,
      T27,
      T28
    >,
    InsertValuesStep29<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23,
      T24,
      T25,
      T26,
      T27,
      T28,
      T29
    >,
    InsertValuesStep30<
      R,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      T21,
      T22,
      T23,
      T24,
      T25,
      T26,
      T27,
      T28,
      T29,
      T30
    >,
    InsertOnDuplicateKeySetStep<R>,
    InsertOnDuplicateKeyStep<R>,
    InsertOnDuplicateKeySetMoreStep<R>,
    InsertFinalStep<R> {
  constructor(
    readonly state: InsertState<R>,
    private readonly queryRunner: QueryRunner
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
        updates: [...this.state.duplicateKey.updates, [column, val(value)]]
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
