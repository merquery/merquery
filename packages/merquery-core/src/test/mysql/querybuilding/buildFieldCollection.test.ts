import { buildFieldCollection } from "../../../impl/driver/mysql/querybuilding/buildFieldCollection";
import { val } from "../../../impl/util/val";

test("buildFieldCollection connects fields with a comma", () => {
  expect(buildFieldCollection([val(1), val(2), val(3)])).toBe("1, 2, 3");
});

test("buildFieldCollection throws error when empty array is is supplied", () => {
  expect(() => buildFieldCollection([])).toThrowError(
    "Array needs to have one or more fields."
  );
});
