import { TestSetup } from "../../../testutil/TestUtil";
import { EVENT, USER } from "../../../testutil/TestSchema";
import { createSelectState } from "../../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";

test("select sets SelectState.columns with one column", async () => {
  const { dsl, runner } = TestSetup();

  await dsl.select(EVENT.ID.FIELD).fetchAllMapped(x => ({}));

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectState({ columns: [EVENT.ID.FIELD] })
  );
});

test("select sets SelectState.columns with multiple columns", async () => {
  const { dsl, runner } = TestSetup();

  await dsl
    .select(EVENT.ID.FIELD, EVENT.NAME.FIELD, EVENT.DESCRIPTION.FIELD)
    .fetchAllMapped(x => ({}));

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectState({
      columns: [EVENT.ID.FIELD, EVENT.NAME.FIELD, EVENT.DESCRIPTION.FIELD]
    })
  );
});
