import { buildFieldOwnerName } from "../../../impl/driver/mysql/querybuilding/buildFieldOwnerName";

test("buildFieldOwner returns array with 1 element, which is the alias, when an AliasFieldOwner is provided", () => {
  expect(
    buildFieldOwnerName({ kind: "AliasFieldOwner", alias: "alias" })
  ).toEqual(["alias"]);
});

test("buildFieldOwner returns array with 2 elements, first: schema, second: table, when TableFieldOwner is provided", () => {
  expect(
    buildFieldOwnerName({
      kind: "TableFieldOwner",
      schema: "schema",
      table: "table"
    })
  ).toEqual(["schema", "table"]);
});
