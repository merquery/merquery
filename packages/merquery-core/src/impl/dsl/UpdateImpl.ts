import { UpdateSetStep } from "../../UpdateSetStep";
import { Row } from "../../Row";
import { UpdateSetMoreStep } from "../../UpdateSetMoreStep";
import { val } from "../util/val";
import { TableField } from "../../TableField";
import { UpdateState } from "../../UpdateState";
import { QueryRunner } from "../../QueryRunner";
import { UpdateConditionStep } from "../../UpdateConditionStep";
import { UpdateWhereStep } from "../../UpdateWhereStep";
import { Condition } from "../../Condition";
import { ConditionBuilderImpl } from "../ConditionBuilderImpl";
import { UpdateFinalStep } from "../../UpdateFinalStep";
import { Table } from "../../TableLike";
import { QueryBuilder } from "../../QueryBuilder";
export class UpdateImpl<R extends Row>
  implements
    UpdateSetStep<R>,
    UpdateSetMoreStep<R>,
    UpdateConditionStep<R>,
    UpdateWhereStep<R>,
    UpdateFinalStep<R> {
  constructor(
    readonly state: UpdateState<R>,
    private readonly queryRunner: QueryRunner,
    private readonly queryBuilder: QueryBuilder
  ) {}

  withoutWhere(): UpdateFinalStep<R> {
    return this;
  }

  execute(): Promise<void> {
    return this.queryRunner.executeUpdateState(this.state);
  }

  asSqlString(): string {
    return this.queryBuilder.representUpdateStateAsSqlString(this.state);
  }

  where(condition: Condition): UpdateConditionStep<R> {
    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.initial(condition).getCondition()
    });
  }

  and(condition: Condition): UpdateConditionStep<R> {
    if (!this.state.condition) throw new Error("No condition set yet");

    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.extend(this.state.condition)
        .and(condition)
        .getCondition()
    });
  }

  or(condition: Condition): UpdateConditionStep<R> {
    if (!this.state.condition) throw new Error("No condition set yet");

    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.extend(this.state.condition)
        .or(condition)
        .getCondition()
    });
  }

  set<T>(column: TableField<R, T>, value: T) {
    return this.create({
      ...this.state,
      updates: [...this.state.updates, [column, val(value)]]
    });
  }

  create(state: UpdateState<R>) {
    return new UpdateImpl(state, this.queryRunner, this.queryBuilder);
  }

  static initial<R extends Row>(
    queryRunner: QueryRunner,
    queryBuilder: QueryBuilder,
    table: Table<R>
  ) {
    return new UpdateImpl(
      {
        table: table,
        updates: []
      },
      queryRunner,
      queryBuilder
    );
  }
}
