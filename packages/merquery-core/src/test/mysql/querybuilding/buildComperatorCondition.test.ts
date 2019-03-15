import { buildComperatorCondition } from "../../../impl/driver/mysql/querybuilding/buildComperatorCondition";
import { eqValue, eq } from "../../../Condition";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../Field";
test("buildComperatorCondition builds two fields with comperator in between", () => {
  expect(buildComperatorCondition(eq(val(1), val(2)))).toBe("1 = 2");
});
