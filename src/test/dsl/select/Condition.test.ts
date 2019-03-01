import { StubQueryRunner, TestDSL } from "../../../testutil/TestUtil";
import { SelectState } from "../../../SelectState";
import { EVENT } from "../../../testutil/TestSchema";
import { eq, eqValue } from "../../../Condition";
import { ConditionWithOperator } from "../../../ConditionWithOperator";
import { ConditionOperator } from "../../../ConditionOperator";

test("where adds a condition to SelectState.conditions with AND operator", async () => {
  const condition = eqValue(EVENT.ID, 1);

  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.condition).not.toBeUndefined();
      expect(state.condition!.conditions).toEqual([
        {
          condition: condition,
          operator: ConditionOperator.And
        }
      ]);

      return [];
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .where(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("and adds a condition to SelectState.conditions with AND operator", async () => {
  const firstCondition = eqValue(EVENT.ID, 1);
  const testCondition = eqValue(EVENT.ID, 2);

  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.condition).not.toBeUndefined();
      expect(
        state.condition!.conditions[state.condition!.conditions.length - 1]
      ).toEqual({ condition: testCondition, operator: ConditionOperator.And });

      return [];
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .where(firstCondition)
    .and(testCondition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("or adds a condition to SelectState.conditions with OR operator", async () => {
  const firstCondition = eqValue(EVENT.ID, 1);
  const testCondition = eqValue(EVENT.ID, 2);

  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.condition).not.toBeUndefined();
      expect(
        state.condition!.conditions[state.condition!.conditions.length - 1]
      ).toEqual({ condition: testCondition, operator: ConditionOperator.Or });

      return [];
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .where(firstCondition)
    .or(testCondition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});
