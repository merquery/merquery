import { EVENT } from "../../testutil/TestSchema";
import { StubQueryRunner, TestDSL } from "../../testutil/TestUtil";
import { SelectState } from "../../SelectState";

test("fetchOne sets SelectState.limit to 1", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.limit).toBe(1);
      return [];
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl.selectFrom(EVENT).fetchOne();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("selectFrom sets SelectState.recordTable and appends the table to SelectState.from", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.recordTable).toBe(EVENT);
      expect(state.from).toEqual([EVENT]);

      return [];
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl.selectFrom(EVENT).fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});
