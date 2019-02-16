import { ConditionBuilderImpl } from "../../impl/ConditionBuilderImpl";
import { eqValue, ConditionCollection } from "../../Condition";
import { EVENT } from "../../testutil/TestSchema";
import { ConditionOperator } from "../../ConditionOperator";
test("getCondition of initial returns ConditionCollection with initial condition with and", () => {
  const initialCondition = eqValue(EVENT.ID, 1);
  const builder = ConditionBuilderImpl.initial(initialCondition);

  expect(builder.getCondition()).toEqual({
    kind: "ConditionCollection",
    conditions: [
      { operator: ConditionOperator.And, condition: initialCondition }
    ]
  });
});

test("getCondition of initial.and returns ConditionCollection with appended and condition", () => {
  const initialCondition = eqValue(EVENT.ID, 1);
  const testCondition = eqValue(EVENT.ID, 2);

  const builder = ConditionBuilderImpl.initial(initialCondition).and(
    testCondition
  );

  const builtCondition = builder.getCondition();

  expect(
    builtCondition.conditions[builtCondition.conditions.length - 1]
  ).toEqual({ operator: ConditionOperator.And, condition: testCondition });
});

test("getCondition of initial.or returns ConditionCollection with appended or condition", () => {
  const initialCondition = eqValue(EVENT.ID, 1);
  const testCondition = eqValue(EVENT.ID, 2);

  const builder = ConditionBuilderImpl.initial(initialCondition).or(
    testCondition
  );

  const builtCondition = builder.getCondition();

  expect(
    builtCondition.conditions[builtCondition.conditions.length - 1]
  ).toEqual({ operator: ConditionOperator.Or, condition: testCondition });
});
