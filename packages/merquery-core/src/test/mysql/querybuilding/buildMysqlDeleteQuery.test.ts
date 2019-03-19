import { buildMysqlDeleteQuery } from "../../../impl/driver/mysql/querybuilding/buildMysqlDeleteQuery";
import { EVENT } from "../../../testutil/TestSchema";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { Condition } from "../../../Condition";
import { eq } from "../../../impl/util/eq";
import { val } from "../../../impl/util/val";
import { ConditionCollection } from "../../../ConditionCollection";
import { ConditionOperator } from "../../../ConditionOperator";

test("buildMysqlDeleteQuery builds without condition", () => {
  expect(
    buildMysqlDeleteQuery({
      table: EVENT
    })
  ).toEqual("DELETE FROM `projectclub`.`event`");
});

test("buildMysqlDeleteQuery builds with condition", () => {
  expect(
    buildMysqlDeleteQuery({
      table: EVENT,
      condition: {
        kind: "ConditionCollection",
        conditions: OneOrMoreArrayUtil.fromArray([
          {
            condition: eq(val(1), val(2)),
            operator: ConditionOperator.And
          }
        ])
      }
    })
  ).toBe("DELETE FROM `projectclub`.`event` WHERE 1 = 2");
});
