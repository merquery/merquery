import { SelectWhereStep } from "../../SelectWhereStep";
import { SelectConditionStep } from "../../SelectConditionStep";
import { Condition, ComperatorCondition, Comperator } from "../../Condition";
import { Table, TableLike } from "../../TableLike";
import { SelectFinalStep } from "../../SelectFinalStep";
import { assertNever } from "../Util";
import { Field, TableField, ValueField } from "../../Field";
import * as _ from "lodash";
import { SelectState } from "../../SelectState";
import { ConditionOperator } from "../../ConditionOperator";
import { QueryRunner } from "../../QueryRunner";
import { SelectLimitStep } from "../../SelectLimitStep";
import { SelectOffsetStep } from "../../SelectOffsetStep";
import { SelectOrderByStep } from "../../SelectOrderByStep";
import { SelectGroupByStep } from "../../SelectGroupByStep";
import { OrderDirection } from "../../OrderDirection";
import { SelectJoinStep } from "../../SelectJoinStep";
import { SelectJoinOnStep } from "../../SelectJoinOnStep";
import { JoinType } from "../../JoinType";
import { RowUtility } from "../RowUtility";
import { ResultQuery } from "../../ResultQuery";
import { SelectFromStep } from "../../SelectFromStep";
import { Row } from "../../Row";
import { Record } from "../../Record";
import { ResultRow } from "../../QueryResult";
import { SubQuery } from "../../SubQuery";
import { ConditionBuilderImpl } from "../ConditionBuilderImpl";
import { ConditionBuilder } from "../../ConditionBuilder";
import { SelectHavingStep } from "../../SelectHavingStep";
import { SelectForUpdate } from "../../SelectForUpdate";
import { LockMode } from "../../LockMode";

export class SelectImpl<R extends Row>
  implements
    SelectFromStep<R>,
    SelectJoinStep<R>,
    SelectJoinOnStep<R>,
    SelectWhereStep<R>,
    SelectConditionStep<R>,
    SelectGroupByStep<R>,
    SelectHavingStep<R>,
    SelectOrderByStep<R>,
    SelectLimitStep<R>,
    SelectOffsetStep<R>,
    SelectFinalStep<R>,
    SelectForUpdate<R> {
  forUpdate() {
    return this.create({
      ...this.state,
      lockMode: LockMode.ForUpdate
    });
  }

  lockInShareMode() {
    return this.create({
      ...this.state,
      lockMode: LockMode.LockInShareMode
    });
  }

  having(condition: Condition): SelectOrderByStep<R> {
    return this.create({
      ...this.state,
      having: condition
    });
  }
  asSqlString(): string {
    return this.queryRunner.representSelectStateAsSqlString(this.state);
  }
  select(...fields: Field<any>[]): SelectFromStep<R> {
    return this.create({
      ...this.state,
      columns: fields
    });
  }

  asSubQuery(): SubQuery<R> {
    return { state: this.getState() };
  }
  async fetchOne(): Promise<R | undefined> {
    const results = await this.limit(1).fetchAll();
    return results[0];
  }

  async fetchAllMapped<M>(mapper: (result: ResultRow) => M): Promise<M[]> {
    const results = await this.queryRunner.executeSelectState(this.state);

    return results.map(mapper);
  }

  async fetchAll(): Promise<R[]> {
    if (!this.state.recordTable) {
      throw new Error(
        "Calling fetch with no recordTable set has no effect. Consider using fetchAllMapped"
      );
    }

    const mapper = RowUtility.createMapper(this.state.recordTable);

    return this.fetchAllMapped(mapper);
  }

  on(condition: Condition): SelectJoinStep<R> {
    if (!this.state.temporaryJoinedTable)
      throw new Error("Temporary joined table is not set.");

    return this.create({
      ...this.state,

      joins: [
        ...this.state.joins,
        { ...this.state.temporaryJoinedTable, condition: condition }
      ],
      temporaryJoinedTable: undefined
    });
  }

  leftJoin(table: Table<any>): SelectJoinOnStep<R> {
    return this.create({
      ...this.state,
      temporaryJoinedTable: { table: table, joinType: JoinType.Left }
    });
  }

  innerJoin(table: Table<any>): SelectJoinOnStep<R> {
    return this.create({
      ...this.state,
      temporaryJoinedTable: { table: table, joinType: JoinType.Inner }
    });
  }
  rightJoin(table: Table<any>): SelectJoinOnStep<R> {
    return this.create({
      ...this.state,
      temporaryJoinedTable: { table: table, joinType: JoinType.Right }
    });
  }

  getState(): SelectState<R> {
    return { ...this.state };
  }

  groupBy<T>(...fields: Field<any>[]) {
    return this.create({
      ...this.state,
      groupBy: { fields: fields }
    });
  }

  limit(count: number) {
    if (count < 0) throw new Error("Limit needs to be nonnegative");

    return this.create({
      ...this.state,
      limit: count
    });
  }

  orderByAscending<T>(field: TableField<R, T>) {
    return this.create({
      ...this.state,
      orderBy: [
        ...this.state.orderBy,
        { field: field, direction: OrderDirection.Ascending }
      ]
    });
  }

  orderByDescending<T>(field: TableField<R, T>) {
    return this.create({
      ...this.state,
      orderBy: [
        ...this.state.orderBy,
        { field: field, direction: OrderDirection.Descending }
      ]
    });
  }

  offset(count: number) {
    if (count < 0) throw new Error("Offset needs to be nonnegative");

    return this.create({
      ...this.state,
      offset: count
    });
  }
  constructor(
    private state: SelectState<R>,
    private queryRunner: QueryRunner
  ) {}

  static initial<R extends Row>(executor: QueryRunner) {
    return new SelectImpl<R>(
      {
        from: [],
        orderBy: [],
        joins: [],
        columns: []
      },
      executor
    );
  }

  private create(state: SelectState<R>) {
    return new SelectImpl<R>(state, this.queryRunner);
  }

  from(table: TableLike<any>) {
    return this.create({
      ...this.state,
      from: [...this.state.from, table]
    });
  }

  fromRecordTable(table: Table<R>) {
    return this.create({
      ...this.state,
      from: [...this.state.from, table],
      recordTable: table
    });
  }

  where(condition: Condition): SelectConditionStep<R> {
    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.initial(condition).getCondition()
    });
  }

  and(condition: Condition): SelectConditionStep<R> {
    if (!this.state.condition) throw new Error("No condition set yet");

    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.initial(this.state.condition)
        .and(condition)
        .getCondition()
    });
  }

  or(condition: Condition): SelectConditionStep<R> {
    if (!this.state.condition) throw new Error("No condition set yet");

    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.initial(this.state.condition)
        .or(condition)
        .getCondition()
    });
  }
}
