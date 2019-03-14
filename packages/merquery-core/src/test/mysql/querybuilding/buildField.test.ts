import { buildField } from "../../../impl/driver/mysql/querybuilding/buildField";
import { EVENT } from "../../../testutil/TestSchema";
import { buildTableField } from "../../../impl/driver/mysql/querybuilding/buildTableField";
import { TableField, ValueField } from "../../../Field";
import { buildValueField } from "../../../impl/driver/mysql/querybuilding/buildValueField";

test("buildField builds a table field when a TableField is supplied", () => {
  const a: TableField<any, any> = {
    kind: "TableField",
    table: {
      kind: "TableFieldOwner",
      schema: "schema",
      table: "table"
    },
    column: "column",
    rowKind: "XXX",
    type: {
      type: "STRING"
    }
  };

  expect(buildField(a)).toBe(buildTableField(a));
});

test("buildField builds a value field when a ValueField is supplied", () => {
  const a: ValueField<any> = {
    kind: "ValueField",
    value: 1
  };

  expect(buildField(a)).toBe(buildValueField(a));
});
