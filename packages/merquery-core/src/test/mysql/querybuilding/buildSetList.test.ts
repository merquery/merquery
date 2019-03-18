import {
  buildSetList,
  Assignment
} from "../../../impl/driver/mysql/querybuilding/buildSetList";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";

test("buildSetList builds fields and values connected by equals", () => {
  const assignments = OneOrMoreArrayUtil.fromArray<Assignment<any, any>>([
    [EVENT.ID.FIELD, val(1)],
    [EVENT.NAME.FIELD, val("Test")]
  ]);

  expect(buildSetList(assignments)).toBe(
    "`projectclub`.`event`.`id` = 1, `projectclub`.`event`.`name` = 'Test'"
  );
});
