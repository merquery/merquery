import { SelectWhereStep } from "../../SelectWhereStep";
import { SelectConditionStep } from "../../SelectConditionStep";
import { Condition } from "../../Condition";
import { ComparatorCondition } from "../../ComparatorCondition";
import { Comparator } from "../../Comparator";
import { Table, TableLike, TableLikeOrTableLikeAlias } from "../../TableLike";
import { SelectFinalStep } from "../../SelectFinalStep";
import { assertNever } from "../Util";
import { Field } from "../../Field";
import { ValueField } from "../../ValueField";
import { TableField } from "../../TableField";
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
import { ResultRow } from "../../ResultRow";
import { SubQuery } from "../../SubQuery";
import { ConditionBuilderImpl } from "../ConditionBuilderImpl";
import { ConditionBuilder } from "../../ConditionBuilder";
import { SelectHavingStep } from "../../SelectHavingStep";
import { SelectForUpdate } from "../../SelectForUpdate";
import { LockMode } from "../../LockMode";
import { OneOrMoreArrayUtil } from "../OneOrMoreArray";
import { createSelectState } from "../createSelectState";
import { QueryBuilder } from "../../QueryBuilder";

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
    SelectForUpdate<R>,
    SelectFinalStep<R> {
  constructor(
    readonly state: SelectState<R>,
    private readonly queryRunner: QueryRunner,
    private readonly queryBuilder: QueryBuilder
  ) {}

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
    return this.queryBuilder.representSelectStateAsSqlString(this.state);
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

    if (!Array.isArray(results))
      throw new Error(
        "executeSelectState didn't return a array. Did you forget to mock the return value?"
      );

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
      joins: OneOrMoreArrayUtil.append(this.state.joins, [
        { ...this.state.temporaryJoinedTable, condition: condition }
      ]),
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

  groupBy<T>(field: Field<any>, ...fields: Field<any>[]) {
    return this.create({
      ...this.state,
      groupBy: OneOrMoreArrayUtil.fromArray([field, ...fields])
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
      orderBy: OneOrMoreArrayUtil.append(this.state.orderBy, [
        { field: field, direction: OrderDirection.Ascending }
      ])
    });
  }

  orderByDescending<T>(field: TableField<R, T>) {
    return this.create({
      ...this.state,
      orderBy: OneOrMoreArrayUtil.append(this.state.orderBy, [
        { field: field, direction: OrderDirection.Descending }
      ])
    });
  }

  offset(count: number) {
    if (count < 0) throw new Error("Offset needs to be nonnegative");

    return this.create({
      ...this.state,
      offset: count
    });
  }

  static initial<R extends Row>(
    executor: QueryRunner,
    queryBuilder: QueryBuilder
  ) {
    return new SelectImpl<R>(createSelectState(), executor, queryBuilder);
  }

  private create(state: SelectState<R>) {
    return new SelectImpl<R>(state, this.queryRunner, this.queryBuilder);
  }

  from(
    table: TableLikeOrTableLikeAlias<any>,
    ...tables: TableLikeOrTableLikeAlias<any>[]
  ) {
    return this.create({
      ...this.state,
      from: OneOrMoreArrayUtil.append(this.state.from, [table, ...tables])
    });
  }

  fromRecordTable(table: Table<R>) {
    return this.create({
      ...this.state,
      from: OneOrMoreArrayUtil.append(this.state.from, [table]),
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
      condition: ConditionBuilderImpl.extend(this.state.condition)
        .and(condition)
        .getCondition()
    });
  }

  or(condition: Condition): SelectConditionStep<R> {
    if (!this.state.condition) throw new Error("No condition set yet");

    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.extend(this.state.condition)
        .or(condition)
        .getCondition()
    });
  }
}
