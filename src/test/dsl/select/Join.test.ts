import { eq } from "../../../Condition";
import { val } from "../../../Field";
import {
  StubQueryRunner,
  TestDSL,
  expectSelectState
} from "../../../testutil/TestUtil";
import { SelectState } from "../../../SelectState";
import { EVENT, USER } from "../../../testutil/TestSchema";
import { JoinType } from "../../../JoinType";

test("innerJoin adds inner join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: expectSelectState(state => {
      expect(state.joins).toEqual([
        { condition: condition, joinType: JoinType.Inner, table: USER }
      ]);
    })
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .innerJoin(USER)
    .on(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("leftJoin adds left join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: expectSelectState(state => {
      expect(state.joins).toEqual([
        { condition: condition, joinType: JoinType.Left, table: USER }
      ]);
    })
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .leftJoin(USER)
    .on(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});

test("rightJoin adds right join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: expectSelectState(state => {
      expect(state.joins).toEqual([
        { condition: condition, joinType: JoinType.Right, table: USER }
      ]);
    })
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .rightJoin(USER)
    .on(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalled();
});
