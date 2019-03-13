import { ConditionBuilderImpl } from "../../impl/ConditionBuilderImpl";
import { eqValue, ConditionCollection } from "../../Condition";
import { EVENT } from "../../testutil/TestSchema";
import { ConditionOperator } from "../../ConditionOperator";
import { OneOrMoreArrayUtil } from "../../impl/OneOrMoreArray";
test("getCondition of initial returns ConditionCollection with initial condition with and", () => {
  const initialCondition = eqValue(EVENT.ID, 1);
  const builder = ConditionBuilderImpl.initial(initialCondition);

  expect(builder.getCondition()).toEqual({
    kind: "ConditionCollection",
    conditions: OneOrMoreArrayUtil.fromArray([
      { operator: ConditionOperator.And, condition: initialCondition }
    ])
  });
});

test("getCondition of initial.and returns ConditionCollection with appended and condition", () => {
  const initialCondition = eqValue(EVENT.ID, 1);
  const testCondition = eqValue(EVENT.ID, 2);

  const builder = ConditionBuilderImpl.initial(initialCondition).and(
    testCondition
  );

  expect(builder.getCondition()).toEqual({
    kind: "ConditionCollection",
    conditions: OneOrMoreArrayUtil.fromArray([
      {
        operator: ConditionOperator.And,
        condition: initialCondition
      },
      {
        operator: ConditionOperator.And,
        condition: testCondition
      }
    ])
  });
});

test("getCondition of initial.or returns ConditionCollection with appended or condition", () => {
  const initialCondition = eqValue(EVENT.ID, 1);
  const testCondition = eqValue(EVENT.ID, 2);

  const builder = ConditionBuilderImpl.initial(initialCondition).or(
    testCondition
  );

  expect(builder.getCondition()).toEqual({
    kind: "ConditionCollection",
    conditions: OneOrMoreArrayUtil.fromArray([
      {
        operator: ConditionOperator.And,
        condition: initialCondition
      },
      {
        operator: ConditionOperator.Or,
        condition: testCondition
      }
    ])
  });
});
