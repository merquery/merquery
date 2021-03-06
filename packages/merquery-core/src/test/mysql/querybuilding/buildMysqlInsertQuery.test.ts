import { buildMysqlInsertQuery } from "../../../impl/driver/mysql/querybuilding/buildMysqlInsertQuery";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";

test("buildMysqlInsertQuery builds with value", () => {
  expect(
    buildMysqlInsertQuery({
      table: EVENT,
      fields: [EVENT.ID.FIELD],
      values: [[val(1)]]
    })
  ).toBe(
    "INSERT INTO `projectclub`.`event` (`projectclub`.`event`.`id`) VALUES (1)"
  );
});

test("buildMysqlInsertQuery builds with empty fields and values", () => {
  expect(
    buildMysqlInsertQuery({
      table: EVENT,
      fields: [],
      values: [[]]
    })
  ).toBe("INSERT INTO `projectclub`.`event` () VALUES ()");
});

test("buildMysqlInsertQuery builds with empty fields and values", () => {
  expect(() =>
    buildMysqlInsertQuery({
      table: EVENT,
      fields: [],
      values: [[val("123")]]
    })
  ).toThrowError("Mismatching field");
});
