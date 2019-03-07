import { val } from "../../../Field";
import { eq } from "lodash";
import {
  StubQueryRunner,
  expectSelectState,
  TestDSL
} from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import { LockMode } from "../../../LockMode";
import { createSelectStateWithRecordTable } from "../../../impl/createSelectState";

test("forUpdate sets SelectState.lockMode to LockMode.ForUpdate", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .forUpdate()
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ lockMode: LockMode.ForUpdate }, EVENT)
  );
});

test("lockInShareMode sets SelectState.lockMode to LockMode.LockInShareMode", async () => {
  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .lockInShareMode()
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        lockMode: LockMode.LockInShareMode
      },
      EVENT
    )
  );
});
