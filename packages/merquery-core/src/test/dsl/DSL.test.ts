import { EVENT } from "../../testutil/TestSchema";
import { StubQueryRunner, TestDSL, TestSetup } from "../../testutil/TestUtil";
import { SelectState } from "../../SelectState";
import { createSelectStateWithRecordTable } from "../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../impl/OneOrMoreArray";

test("fetchOne sets SelectState.limit to 1", async () => {
  const { dsl, runner } = TestSetup();

  await dsl.selectFrom(EVENT).fetchOne();

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ limit: 1 }, EVENT)
  );
});

test("selectFrom sets SelectState.recordTable and appends the table to SelectState.from", async () => {
  const { dsl, runner } = TestSetup();

  await dsl.selectFrom(EVENT).fetchAll();

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      { from: OneOrMoreArrayUtil.just(EVENT) },
      EVENT
    )
  );
});
