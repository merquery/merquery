import { buildHavingCondition } from "../../../impl/driver/mysql/querybuilding/buildHavingCondition";
import { val } from "../../../impl/util/val";
import { eq } from "../../../impl/util/eq";

test("buildHavingCondition builds condition", () => {
  expect(buildHavingCondition(eq(val(1), val(2)))).toBe("1 = 2");
});
