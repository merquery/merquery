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
    .groupBy(EVENT.ID.FIELD)
    .fetchAll();

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        groupBy: OneOrMoreArrayUtil.just(EVENT.ID.FIELD)
      },
      EVENT
    )
  );
});

test("groupBy with multiple parameters adds multiple fields to SelectState.groupBy", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .selectFrom(EVENT)
    .groupBy(EVENT.ID.FIELD, EVENT.NAME.FIELD, EVENT.DESCRIPTION.FIELD)
    .fetchAll();

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        groupBy: OneOrMoreArrayUtil.fromArray([
          EVENT.ID.FIELD,
          EVENT.NAME.FIELD,
          EVENT.DESCRIPTION.FIELD
        ])
      },
      EVENT
    )
  );
});
