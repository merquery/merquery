import { buildInCondition } from "../../../impl/driver/mysql/querybuilding/buildInCondition";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";

test("buildInCondition builds IN condition", () => {
  expect(
    buildInCondition({
      kind: "InCondition",
      field: EVENT.ID.FIELD,
      values: OneOrMoreArrayUtil.just(val("123"), val("456"))
    })
  ).toBe("`projectclub`.`event`.`id` IN ('123', '456')");
});
