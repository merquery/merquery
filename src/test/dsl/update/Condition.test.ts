import { StubQueryRunner, TestDSL } from "../../../testutil/TestUtil";
import { USER } from "../../../testutil/TestSchema";
import { UpdateState } from "../../../UpdateState";
import { eqValue } from "../../../Condition";
import { ConditionOperator } from "../../../ConditionOperator";

test("where sets UpdateState.condition", () => {
  const queryRunner = StubQueryRunner({
    executeUpdateState: jest.fn()
  });

  const condition = eqValue(USER.ID, 1);

  const dsl = TestDSL(queryRunner);
  dsl
    .update(USER)
    .set(USER.ID, 1)
    .where(condition)
    .execute();

  expect(queryRunner.executeUpdateState).toBeCalledWith({
    table: USER,
    condition: {
      kind: "ConditionCollection",
      conditions: [{ condition: condition, operator: ConditionOperator.And }]
    },
    updates: [[USER.ID, 1]]
  });
});

test("where().and() sets two conditions connected by and UpdateState.condition", () => {
  const queryRunner = StubQueryRunner({
    executeUpdateState: jest.fn()
  });

  const condition = eqValue(USER.ID, 1);
  const condition2 = eqValue(USER.NAME, "Test");

  const dsl = TestDSL(queryRunner);
  dsl
    .update(USER)
    .set(USER.ID, 1)
    .where(condition)
    .and(condition2)
    .execute();

  expect(queryRunner.executeUpdateState).toBeCalledWith({
    table: USER,
    condition: {
      kind: "ConditionCollection",
      conditions: [
        { condition: condition, operator: ConditionOperator.And },
        { condition: condition2, operator: ConditionOperator.And }
      ]
    },
    updates: [[USER.ID, 1]]
  });
});

test("where().and() sets two conditions connected by and UpdateState.condition", () => {
  const queryRunner = StubQueryRunner({
    executeUpdateState: jest.fn()
  });

  const condition = eqValue(USER.ID, 1);
  const condition2 = eqValue(USER.NAME, "Test");

  const dsl = TestDSL(queryRunner);
  dsl
    .update(USER)
    .set(USER.ID, 1)
    .where(condition)
    .or(condition2)
    .execute();

  expect(queryRunner.executeUpdateState).toBeCalledWith({
    table: USER,
    condition: {
      kind: "ConditionCollection",
      conditions: [
        { condition: condition, operator: ConditionOperator.And },
        { condition: condition2, operator: ConditionOperator.Or }
      ]
    },
    updates: [[USER.ID, 1]]
  });
});
