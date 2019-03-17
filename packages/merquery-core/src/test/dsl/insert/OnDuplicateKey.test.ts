import {
  StubQueryRunner,
  TestDSL,
  TestSetup
} from "../../../testutil/TestUtil";
import { InsertState } from "../../../InsertState";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../Field";

test("onDuplicateKeyUpdate and set sets the correct InsertState.duplicateKey and single update", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .insertInto(EVENT, EVENT.ID.FIELD)
    .onDuplicateKeyUpdate()
    .set(EVENT.ID.FIELD, 2)
    .execute();

  expect(runner.executeInsertState).toBeCalledWith({
    duplicateKey: {
      kind: "OnDuplicateKeyUpdate",
      updates: [[EVENT.ID.FIELD, val(2)]]
    },
    fields: [EVENT.ID.FIELD],
    table: EVENT,
    values: []
  });
});

test("onDuplicateKeyUpdate and multiple set sets the correct InsertState.duplicateKey and updates", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .insertInto(EVENT, EVENT.ID.FIELD, EVENT.NAME.FIELD)
    .onDuplicateKeyUpdate()
    .set(EVENT.ID.FIELD, 3)
    .set(EVENT.NAME.FIELD, "Test")
    .execute();

  expect(runner.executeInsertState).toBeCalledWith({
    duplicateKey: {
      kind: "OnDuplicateKeyUpdate",
      updates: [[EVENT.ID.FIELD, val(3)], [EVENT.NAME.FIELD, val("Test")]]
    },
    fields: [EVENT.ID.FIELD, EVENT.NAME.FIELD],
    table: EVENT,
    values: []
  });
});

test("onDuplicateKeyIgnore sets the correct InsertState.duplicateKey", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .insertInto(EVENT, EVENT.ID.FIELD)
    .onDuplicateKeyIgnore()
    .execute();

  expect(runner.executeInsertState).toBeCalledWith({
    duplicateKey: {
      kind: "OnDuplicateKeyIgnore"
    },
    fields: [EVENT.ID.FIELD],
    table: EVENT,
    values: []
  });
});
