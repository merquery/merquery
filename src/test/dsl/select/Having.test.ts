import {
  StubQueryRunner,
  expectSelectState,
  TestDSL
} from "../../../testutil/TestUtil";
import { eq } from "../../../Condition";
import { val } from "../../../Field";
import { EVENT } from "../../../testutil/TestSchema";

test("having sets SelectState.having", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: expectSelectState(state => {
      expect(state.having).toEqual(condition);
    })
  });

  const dsl = TestDSL(queryRunner);
  await dsl
    .selectFrom(EVENT)
    .having(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});
