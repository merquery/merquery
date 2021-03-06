import {
  TestSetup,
  StubQueryRunner,
  StubQueryBuilder
} from "../../../testutil/TestUtil";
import { EVENT, USER } from "../../../testutil/TestSchema";
import { createSelectState } from "../../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";

test("select sets SelectState.columns with one column", async () => {
  const selectImpl = SelectImpl.initial(StubQueryRunner(), StubQueryBuilder());

  expect(selectImpl.select(EVENT.ID.FIELD).state).toEqual(
    createSelectState({ columns: [EVENT.ID.FIELD] })
  );
});

test("select sets SelectState.columns with multiple columns", async () => {
  const selectImpl = SelectImpl.initial(StubQueryRunner(), StubQueryBuilder());

  expect(
    selectImpl.select(EVENT.ID.FIELD, EVENT.NAME.FIELD, EVENT.DESCRIPTION.FIELD)
      .state
  ).toEqual(
    createSelectState({
      columns: [EVENT.ID.FIELD, EVENT.NAME.FIELD, EVENT.DESCRIPTION.FIELD]
    })
  );
});
