import { buildSetList } from "../../../impl/driver/mysql/querybuilding/buildSetList";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";
import { TableValueField } from "../../../TableValueField";

test("buildSetList builds fields and values connected by equals", () => {
  const assignments = OneOrMoreArrayUtil.fromArray<TableValueField<any, any>>([
    { kind: "TableValueField", tableField: EVENT.ID.FIELD, value: 1 },
    { kind: "TableValueField", tableField: EVENT.NAME.FIELD, value: "Test" }
  ]);

  expect(buildSetList(assignments)).toBe(
    "`projectclub`.`event`.`id` = 1, `projectclub`.`event`.`name` = 'Test'"
  );
});
