import { buildComperatorCondition } from "../../../impl/driver/mysql/querybuilding/buildComperatorCondition";

import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";
import { eq } from "../../../impl/util/eq";
test("buildComperatorCondition builds two fields with comperator in between", () => {
  expect(buildComperatorCondition(eq(val(1), val(2)))).toBe("1 = 2");
});
