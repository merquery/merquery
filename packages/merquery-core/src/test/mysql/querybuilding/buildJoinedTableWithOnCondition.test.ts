import { buildJoinedTableWithOnCondition } from "../../../impl/driver/mysql/querybuilding/buildJoinedTableWithOnCondition";
import { JoinType } from "../../../JoinType";
import { val } from "../../../impl/util/val";
import { EVENT } from "../../../testutil/TestSchema";
import { eq } from "../../../impl/util/eq";

test("buildJoinedTableWithOnCondition", () => {
  expect(
    buildJoinedTableWithOnCondition({
      condition: eq(val(1), val(2)),
      joinType: JoinType.Inner,
      table: {
        kind: "Table",
        fields: [],
        name: "table",
        schema: "schema",
        rowKind: "rowKind"
      }
    })
  ).toBe("INNER JOIN `schema`.`table` ON (1 = 2)");
});
