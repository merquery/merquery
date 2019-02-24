import { buildDirection } from "../../../impl/driver/mysql/querybuilding/buildDirection";
import { OrderDirection } from "../../../OrderDirection";

test("buildDirection returns ASC when order direction is Ascending", () => {
  expect(buildDirection(OrderDirection.Ascending)).toBe("ASC");
});

test("buildDirection returns DESC when order direction is Descending", () => {
  expect(buildDirection(OrderDirection.Descending)).toBe("DESC");
});
