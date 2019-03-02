import { val } from "../../../Field";
import { eq } from "lodash";
import {
  StubQueryRunner,
  expectSelectState,
  TestDSL
} from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import { LockMode } from "../../../LockMode";

test("forUpdate sets SelectState.lockMode to LockMode.ForUpdate", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: expectSelectState(state => {
      expect(state.lockMode).toEqual(LockMode.ForUpdate);
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .forUpdate()
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("lockInShareMode sets SelectState.lockMode to LockMode.LockInShareMode", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: expectSelectState(state => {
      expect(state.lockMode).toEqual(LockMode.LockInShareMode);
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .lockInShareMode()
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});
