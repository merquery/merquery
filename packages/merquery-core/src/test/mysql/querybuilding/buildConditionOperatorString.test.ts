import { buildConditionOperatorString } from "../../../impl/driver/mysql/querybuilding/buildConditionOperatorString";
import { ConditionOperator } from "../../../ConditionOperator";
test("buildConditionOperatorString returns 'AND' for And Condition Operator", () => {
  expect(buildConditionOperatorString(ConditionOperator.And)).toBe("AND");
});

test("buildConditionOperatorString returns 'OR' for Or Condition Operator", () => {
  expect(buildConditionOperatorString(ConditionOperator.Or)).toBe("OR");
});
