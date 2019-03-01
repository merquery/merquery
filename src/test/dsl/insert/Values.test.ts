import { StubQueryRunner, TestDSL } from "../../../testutil/TestUtil";
import { InsertState } from "../../../InsertState";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../Field";

test("insert without values has empty values array in InsertState", async () => {
  const queryRunner = StubQueryRunner({
    executeInsertState: jest.fn(async (state: InsertState<any>) => {
      expect(state.values).toEqual([]);
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl.insertInto(EVENT, EVENT.ID, EVENT.NAME).execute();

  expect(queryRunner.executeInsertState).toBeCalled();
});

test("insert with one values has 1 values entry in array in InsertState", async () => {
  const queryRunner = StubQueryRunner({
    executeInsertState: jest.fn(async (state: InsertState<any>) => {
      expect(state.values).toEqual([[val(1), val("Test")]]);
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .insertInto(EVENT, EVENT.ID, EVENT.NAME)
    .values(1, "Test")
    .execute();

  expect(queryRunner.executeInsertState).toBeCalled();
});

test("insert with 2 values has 2 values entry in array in InsertState", async () => {
  const queryRunner = StubQueryRunner({
    executeInsertState: jest.fn(async (state: InsertState<any>) => {
      expect(state.values).toEqual([
        [val(1), val("Test")],
        [val(2), val("Test2")]
      ]);
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .insertInto(EVENT, EVENT.ID, EVENT.NAME)
    .values(1, "Test")
    .values(2, "Test2")
    .execute();

  expect(queryRunner.executeInsertState).toBeCalled();
});