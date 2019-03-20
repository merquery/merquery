import {
  TestDSL,
  StubQueryRunner,
  TestSetup,
  StubQueryBuilder,
  NOT_IMPLEMENTED
} from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import {
  createSelectStateWithRecordTable,
  createSelectState
} from "../../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";

test("groupBy with one parameter adds one field to SelectState.groupBy", async () => {
  const selectImpl = SelectImpl.initial(
    NOT_IMPLEMENTED,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.groupBy(EVENT.ID.FIELD).state).toEqual(
    createSelectState({
      groupBy: OneOrMoreArrayUtil.just(EVENT.ID.FIELD)
    })
  );
});

test("groupBy with multiple parameters adds multiple fields to SelectState.groupBy", async () => {
  const selectImpl = SelectImpl.initial(
    NOT_IMPLEMENTED,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(
    selectImpl.groupBy(
      EVENT.ID.FIELD,
      EVENT.NAME.FIELD,
      EVENT.DESCRIPTION.FIELD
    ).state
  ).toEqual(
    createSelectState({
      groupBy: OneOrMoreArrayUtil.fromArray([
        EVENT.ID.FIELD,
        EVENT.NAME.FIELD,
        EVENT.DESCRIPTION.FIELD
      ])
    })
  );
});
