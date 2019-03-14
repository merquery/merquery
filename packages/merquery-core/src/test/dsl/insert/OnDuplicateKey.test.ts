import { StubQueryRunner, TestDSL } from "../../../testutil/TestUtil";
import { InsertState } from "../../../InsertState";
import { EVENT } from "../../../testutil/TestSchema";

test("onDuplicateKeyUpdate and set sets the correct InsertState.duplicateKey and single update", async () => {
  const queryRunner = StubQueryRunner({
    executeInsertState: jest.fn(async (state: InsertState<any>) => {
      expect(state.duplicateKey).toEqual({
        kind: "OnDuplicateKeyUpdate",
        updates: [[EVENT.ID, 2]]
      });
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .insertInto(EVENT, EVENT.ID)
    .onDuplicateKeyUpdate()
    .set(EVENT.ID, 2)
    .execute();

  expect(queryRunner.executeInsertState).toBeCalled();
});

test("onDuplicateKeyUpdate and multiple set sets the correct InsertState.duplicateKey and updates", async () => {
  const queryRunner = StubQueryRunner({
    executeInsertState: jest.fn(async (state: InsertState<any>) => {
      expect(state.duplicateKey).toEqual({
        kind: "OnDuplicateKeyUpdate",
        updates: [[EVENT.ID, 3], [EVENT.NAME, "Test"]]
      });
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .insertInto(EVENT, EVENT.ID, EVENT.NAME)
    .onDuplicateKeyUpdate()
    .set(EVENT.ID, 3)
    .set(EVENT.NAME, "Test")
    .execute();

  expect(queryRunner.executeInsertState).toBeCalled();
});

test("onDuplicateKeyIgnore sets the correct InsertState.duplicateKey", async () => {
  const queryRunner = StubQueryRunner({
    executeInsertState: jest.fn(async (state: InsertState<any>) => {
      expect(state.duplicateKey).toEqual({
        kind: "OnDuplicateKeyIgnore"
      });
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .insertInto(EVENT, EVENT.ID, EVENT.NAME)
    .onDuplicateKeyIgnore()
    .execute();

  expect(queryRunner.executeInsertState).toBeCalled();
});
