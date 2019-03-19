import {
  StubQueryRunner,
  TestDSL,
  TestSetup,
  StubQueryBuilder
} from "../../../testutil/TestUtil";
import { InsertState } from "../../../InsertState";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";
import { InsertImpl } from "../../../impl/dsl/InsertImpl";

test("onDuplicateKeyUpdate and set sets the correct InsertState.duplicateKey and single update", async () => {
  const insertDsl = InsertImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  expect(insertDsl.onDuplicateKeyUpdate().set(EVENT.ID.FIELD, 2).state).toEqual(
    {
      duplicateKey: {
        kind: "OnDuplicateKeyUpdate",
        updates: [[EVENT.ID.FIELD, val(2)]]
      },
      fields: [],
      table: EVENT,
      values: []
    }
  );
});

test("onDuplicateKeyUpdate and multiple set sets the correct InsertState.duplicateKey and updates", async () => {
  const insertDsl = InsertImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  expect(
    insertDsl
      .onDuplicateKeyUpdate()
      .set(EVENT.ID.FIELD, 3)
      .set(EVENT.NAME.FIELD, "Test").state
  ).toEqual({
    duplicateKey: {
      kind: "OnDuplicateKeyUpdate",
      updates: [[EVENT.ID.FIELD, val(3)], [EVENT.NAME.FIELD, val("Test")]]
    },
    fields: [],
    table: EVENT,
    values: []
  });
});

test("set throws error if no OnDuplicateKeyUpdate", async () => {
  const insertDsl = InsertImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  expect(() => insertDsl.set(EVENT.ID.FIELD, 3)).toThrowError("Invalid state");
});

test("onDuplicateKeyIgnore sets the correct InsertState.duplicateKey", async () => {
  const insertDsl = InsertImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  expect(insertDsl.onDuplicateKeyIgnore().state).toEqual({
    duplicateKey: {
      kind: "OnDuplicateKeyIgnore"
    },
    fields: [],
    table: EVENT,
    values: []
  });
});
