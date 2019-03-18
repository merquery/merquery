import {
  StubQueryRunner,
  TestDSL,
  TestSetup
} from "../../../testutil/TestUtil";
import { InsertState } from "../../../InsertState";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";

test("insert without values has empty values array in InsertState", async () => {
  const { dsl, runner } = TestSetup();

  await dsl.insertInto(EVENT, EVENT.ID.FIELD, EVENT.NAME.FIELD).execute();

  expect(runner.executeInsertState).toBeCalledWith({
    table: EVENT,
    fields: [EVENT.ID.FIELD, EVENT.NAME.FIELD],
    values: []
  });
});

test("insert with one values has 1 values entry in array in InsertState", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .insertInto(EVENT, EVENT.ID.FIELD, EVENT.NAME.FIELD)
    .values(1, "Test")
    .execute();

  expect(runner.executeInsertState).toBeCalledWith({
    table: EVENT,
    fields: [EVENT.ID.FIELD, EVENT.NAME.FIELD],
    values: [[val(1), val("Test")]]
  });
});

test("insert with 2 values has 2 values entry in array in InsertState", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .insertInto(EVENT, EVENT.ID.FIELD, EVENT.NAME.FIELD)
    .values(1, "Test")
    .values(2, "Test2")
    .execute();

  expect(runner.executeInsertState).toBeCalledWith({
    table: EVENT,
    fields: [EVENT.ID.FIELD, EVENT.NAME.FIELD],
    values: [[val(1), val("Test")], [val(2), val("Test2")]]
  });
});
