import {
  StubQueryRunner,
  expectSelectState,
  expectState,
  TestDSL
} from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import { UpdateState } from "../../../UpdateState";

test("set adds one change to UpdateState.updates", () => {
  const queryRunner = StubQueryRunner({
    executeUpdateState: jest.fn()
  });

  const dsl = TestDSL(queryRunner);

  dsl
    .update(EVENT)
    .set(EVENT.ID, 123)
    .withoutWhere()
    .execute();

  expect(queryRunner.executeUpdateState).toBeCalledWith({
    table: EVENT,
    updates: [[EVENT.ID, 123]]
  });
});

test("multiple set adds multiple to UpdateState.updates", () => {
  const queryRunner = StubQueryRunner({
    executeUpdateState: jest.fn()
  });

  const dsl = TestDSL(queryRunner);

  dsl
    .update(EVENT)
    .set(EVENT.ID, 123)
    .set(EVENT.NAME, "Name")
    .set(EVENT.DESCRIPTION, "Description")
    .withoutWhere()
    .execute();

  expect(queryRunner.executeUpdateState).toBeCalledWith({
    table: EVENT,
    updates: [
      [EVENT.ID, 123],
      [EVENT.NAME, "Name"],
      [EVENT.DESCRIPTION, "Description"]
    ]
  });
});
