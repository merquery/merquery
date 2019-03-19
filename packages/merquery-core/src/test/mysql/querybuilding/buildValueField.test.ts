import { buildValueField } from "../../../impl/driver/mysql/querybuilding/buildValueField";
import { val } from "../../../impl/util/val";
test("buildValueField returns integer like it is", () => {
  expect(buildValueField(val(1))).toBe("1");
});

test("buildValueField returns string with single quotes", () => {
  expect(buildValueField(val("Test"))).toBe("'Test'");
});

test("buildValueField escapes single quotes in string", () => {
  expect(buildValueField(val("' OR ''='"))).toBe("'\\' OR \\'\\'=\\''");
});
