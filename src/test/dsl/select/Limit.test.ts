import { StubQueryRunner, TestDSL } from "../../../testutil/TestUtil";
import { SelectState } from "../../../SelectState";
import { EVENT } from "../../../testutil/TestSchema";
import { createSelectStateWithRecordTable } from "../../../impl/createSelectState";

test("limit sets SelectState.limit for 0", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .limit(0)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ limit: 0 }, EVENT)
  );
});

test("limit throws Exception when count is nonnegative", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);

  expect(() => dsl.selectFrom(EVENT).limit(-22)).toThrowError(
    "Limit needs to be nonnegative"
  );

  expect(queryRunner.executeSelectState).not.toBeCalled();
});

test("limit sets SelectState.limit for positive integer", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .limit(22)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ limit: 22 }, EVENT)
  );
});

test("offset sets SelectState.offset for 0", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .limit(0)
    .offset(0)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ offset: 0, limit: 0 }, EVENT)
  );
});

test("offset throws Exception when count is nonnegative", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
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
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .limit(11)
    .offset(22)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ limit: 11, offset: 22 }, EVENT)
  );
});
