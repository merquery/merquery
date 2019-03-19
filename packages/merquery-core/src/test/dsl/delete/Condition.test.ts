import { DeleteImpl } from "../../../impl/dsl/DeleteImpl";
import { StubQueryRunner, StubQueryBuilder } from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import { DeleteState } from "../../../DeleteState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { ConditionOperator } from "../../../ConditionOperator";

test("where sets initial condition", () => {
  const deleteDsl = DeleteImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  const condition = EVENT.ID.equals(1);

  expect(deleteDsl.where(condition).state).toEqual({
    condition: {
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.just({
        operator: ConditionOperator.And,
        condition: condition
      })
    },
    table: EVENT
  });
});

test("and adds a and condition", () => {
  const deleteDsl = DeleteImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  const condition = EVENT.ID.equals(1);
  const condition2 = EVENT.ID.equals(2);

  expect(deleteDsl.where(condition).and(condition2).state).toEqual({
    condition: {
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.just(
        {
          operator: ConditionOperator.And,
          condition: condition
        },
        {
          operator: ConditionOperator.And,
          condition: condition2
        }
      )
    },
    table: EVENT
  });
});

test("or adds a or condition", () => {
  const deleteDsl = DeleteImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  const condition = EVENT.ID.equals(1);
  const condition2 = EVENT.ID.equals(2);

  expect(deleteDsl.where(condition).or(condition2).state).toEqual({
    condition: {
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.just(
        {
          operator: ConditionOperator.And,
          condition: condition
        },
        {
          operator: ConditionOperator.Or,
          condition: condition2
        }
      )
    },
    table: EVENT
  });
});

test("or throws error when no initial condition is set", () => {
  const deleteDsl = DeleteImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  const condition2 = EVENT.ID.equals(2);

  expect(() => deleteDsl.or(condition2)).toThrowError(
    "No initial condition set."
  );
});

test("and throws error when no initial condition is set", () => {
  const deleteDsl = DeleteImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  const condition2 = EVENT.ID.equals(2);

  expect(() => deleteDsl.and(condition2)).toThrowError(
    "No initial condition set."
  );
});

test("withoutWhere is noop", () => {
  const deleteDsl = DeleteImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  expect(deleteDsl.withoutWhere().state).toEqual({
    table: EVENT
  });
});
