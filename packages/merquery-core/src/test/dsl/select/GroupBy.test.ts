import {
  TestDSL,
  StubQueryRunner,
  TestSetup
} from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import { createSelectStateWithRecordTable } from "../../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";

test("groupBy with one parameter adds one field to SelectState.groupBy", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .selectFrom(EVENT)
    .groupBy(EVENT.ID)
    .fetchAll();

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        groupBy: OneOrMoreArrayUtil.just(EVENT.ID)
      },
      EVENT
    )
  );
});

test("groupBy with multiple parameters adds multiple fields to SelectState.groupBy", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .selectFrom(EVENT)
    .groupBy(EVENT.ID, EVENT.NAME, EVENT.DESCRIPTION)
    .fetchAll();

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        groupBy: OneOrMoreArrayUtil.fromArray([
          EVENT.ID,
          EVENT.NAME,
          EVENT.DESCRIPTION
        ])
      },
      EVENT
    )
  );
});
