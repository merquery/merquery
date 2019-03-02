import { buildHavingCondition } from "../../../impl/driver/mysql/querybuilding/buildHavingCondition";
import { eq } from "../../../Condition";
import { val } from "../../../Field";

test("buildHavingCondition builds condition", () => {
  expect(buildHavingCondition(eq(val(1), val(2)))).toBe("1 = 2");
});
