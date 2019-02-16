import { StubQueryRunner, TestDSL } from "../../testutil/TestUtil";
import { SelectState } from "../../SelectState";
import { EVENT } from "../../testutil/TestSchema";

test("limit sets SelectState.limit for 0", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.limit).toBe(0);

      return [];
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .limit(0)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("limit throws Exception when count is nonnegative", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn()
  });

  const dsl = TestDSL(queryRunner);

  expect(() => dsl.selectFrom(EVENT).limit(-22)).toThrowError(
    "Limit needs to be nonnegative"
  );

  expect(queryRunner.executeSelectState).not.toBeCalled();
});

test("limit sets SelectState.limit for positive integer", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.limit).toBe(22);
      return [];
    })
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .limit(22)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("offset sets SelectState.offset for 0", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.offset).toBe(0);

      return [];
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .limit(0)
    .offset(0)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("offset throws Exception when count is nonnegative", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn()
  });

  const dsl = TestDSL(queryRunner);

  expect(() =>
    dsl
      .selectFrom(EVENT)
      .limit(12)
      .offset(-22)
  ).toThrowError("Offset needs to be nonnegative");

  expect(queryRunner.executeSelectState).not.toBeCalled();
});

test("offset sets SelectState.offset for positive integer", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn(async (state: SelectState<any>) => {
      expect(state.offset).toBe(22);
      return [];
    })
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .limit(11)
    .offset(22)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});
