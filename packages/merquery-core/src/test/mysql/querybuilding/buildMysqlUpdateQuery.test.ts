import { buildMysqlUpdateQuery } from "../../../impl/driver/mysql/querybuilding/buildMysqlUpdateQuery";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { ConditionOperator } from "../../../ConditionOperator";
import { eq } from "../../../impl/util/eq";

test("buildMysqlUpdateQuery builds without condition", () => {
  expect(
    buildMysqlUpdateQuery({
      table: EVENT,
      updates: [
        { kind: "TableValueField", tableField: EVENT.ID.FIELD, value: 1 }
      ]
    })
  ).toBe("UPDATE `projectclub`.`event` SET `projectclub`.`event`.`id` = 1");
});

test("buildMysqlUpdateQuery builds with condition", () => {
  expect(
    buildMysqlUpdateQuery({
      table: EVENT,
      updates: [
        { kind: "TableValueField", tableField: EVENT.ID.FIELD, value: 1 }
      ],
      condition: {
        kind: "ConditionCollection",
        conditions: OneOrMoreArrayUtil.fromArray([
          {
            operator: ConditionOperator.And,
            condition: eq(val(1), val(2))
          }
        ])
      }
    })
  ).toBe(
    "UPDATE `projectclub`.`event` SET `projectclub`.`event`.`id` = 1 WHERE 1 = 2"
  );
});
