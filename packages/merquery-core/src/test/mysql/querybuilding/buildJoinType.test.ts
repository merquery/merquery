import { buildJoinType } from "../../../impl/driver/mysql/querybuilding/buildJoinType";
import { JoinType } from "../../../JoinType";

test("buildJoinType returns INNER for inner join", () => {
  expect(buildJoinType(JoinType.Inner)).toBe("INNER");
});

test("buildJoinType returns LEFT for left join", () => {
  expect(buildJoinType(JoinType.Left)).toBe("LEFT");
});

test("buildJoinType returns RIGHT for right join", () => {
  expect(buildJoinType(JoinType.Right)).toBe("RIGHT");
});
