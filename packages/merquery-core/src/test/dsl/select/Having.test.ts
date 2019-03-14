import {
  StubQueryRunner,
  expectSelectState,
  TestDSL
} from "../../../testutil/TestUtil";
import { eq } from "../../../Condition";
import { val } from "../../../Field";
import { EVENT } from "../../../testutil/TestSchema";
import { createSelectStateWithRecordTable } from "../../../impl/createSelectState";

test("having sets SelectState.having", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .having(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        having: condition
      },
      EVENT
    )
  );
});
