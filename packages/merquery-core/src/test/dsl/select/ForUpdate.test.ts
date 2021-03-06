import { val } from "../../../impl/util/val";
import { eq } from "lodash";
import {
  StubQueryRunner,
  expectSelectState,
  TestDSL,
  StubQueryBuilder
} from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import { LockMode } from "../../../LockMode";
import {
  createSelectStateWithRecordTable,
  createSelectState
} from "../../../impl/createSelectState";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";

test("forUpdate sets SelectState.lockMode to LockMode.ForUpdate", async () => {
  const selectImpl = SelectImpl.initial(StubQueryRunner(), StubQueryBuilder());

  expect(selectImpl.forUpdate().state).toEqual(
    createSelectState({ lockMode: LockMode.ForUpdate })
  );
});

test("lockInShareMode sets SelectState.lockMode to LockMode.LockInShareMode", async () => {
  const selectImpl = SelectImpl.initial(StubQueryRunner(), StubQueryBuilder());

  expect(selectImpl.lockInShareMode().state).toEqual(
    createSelectState({ lockMode: LockMode.LockInShareMode })
  );
});
