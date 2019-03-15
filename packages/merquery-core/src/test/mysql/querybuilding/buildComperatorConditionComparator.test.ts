import { buildComperatorConditionComparator } from "../../../impl/driver/mysql/querybuilding/buildComperatorConditionComparator";

test("buildComperatorConditionComparator returns '=' for equals comperator", () => {
  expect(buildComperatorConditionComparator("=")).toBe("=");
});

test("buildComperatorConditionComparator returns '>=' for bigger than comperator", () => {
  expect(buildComperatorConditionComparator(">=")).toBe(">=");
});

test("buildComperatorConditionComparator returns '<=' for less than comperator", () => {
  expect(buildComperatorConditionComparator("<=")).toBe("<=");
});
