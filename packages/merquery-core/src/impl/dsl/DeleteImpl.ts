import { DeleteState } from "../../DeleteState";
import { Row } from "../../Row";
import { QueryRunner } from "../../QueryRunner";
import { Table } from "../../TableLike";
import { DeleteWhereStep } from "../../DeleteWhereStep";
import { DeleteConditionStep } from "../../DeleteConditionStep";
import { DeleteFinalStep } from "../../DeleteFinalStep";
import { Condition } from "../../Condition";
import { ConditionBuilderImpl } from "../ConditionBuilderImpl";
import { QueryBuilder } from "../../QueryBuilder";

export class DeleteImpl<R extends Row>
  implements DeleteWhereStep<R>, DeleteConditionStep<R>, DeleteFinalStep<R> {
  constructor(
    readonly state: DeleteState<R>,
    private readonly queryRunner: QueryRunner,
    private readonly queryBuilder: QueryBuilder
  ) {}

  asSqlString(): string {
    return this.queryBuilder.representDeleteStateAsSqlString(this.state);
  }

  static initial<R extends Row>(
    queryRunner: QueryRunner,
    queryBuilder: QueryBuilder,
    table: Table<R>
  ) {
    return new DeleteImpl({ table: table }, queryRunner, queryBuilder);
  }

  create(state: DeleteState<R>) {
    return new DeleteImpl(state, this.queryRunner, this.queryBuilder);
  }

  and(condition: Condition): DeleteImpl<R> {
    if (!this.state.condition) throw new Error("No initial condition set.");

    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.extend(this.state.condition)
        .and(condition)
        .getCondition()
    });
  }

  or(condition: Condition): DeleteImpl<R> {
    if (!this.state.condition) throw new Error("No initial condition set.");

    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.extend(this.state.condition)
        .or(condition)
        .getCondition()
    });
  }

  where(condition: Condition): DeleteImpl<R> {
    return this.create({
      ...this.state,
      condition: ConditionBuilderImpl.initial(condition).getCondition()
    });
  }

  withoutWhere(): DeleteImpl<R> {
    return this;
  }

  execute(): Promise<void> {
    return this.queryRunner.executeDeleteState(this.state);
  }
}
