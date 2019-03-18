import { val } from "../../../impl/util/val";
import {
  StubQueryRunner,
  TestDSL,
  expectSelectState
} from "../../../testutil/TestUtil";
import { SelectState } from "../../../SelectState";
import { EVENT, USER } from "../../../testutil/TestSchema";
import { JoinType } from "../../../JoinType";
import { createSelectStateWithRecordTable } from "../../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { JoinedTableWithOnCondition } from "../../../JoinedTableWithOnCondition";
import { eq } from "../../../impl/util/eq";

test("innerJoin adds inner join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .innerJoin(USER)
    .on(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        joins: OneOrMoreArrayUtil.fromArray<JoinedTableWithOnCondition>([
          {
            table: USER,
            joinType: JoinType.Inner,
            condition: condition
          }
        ])
      },
      EVENT
    )
  );
});

test("leftJoin adds left join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .leftJoin(USER)
    .on(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        joins: OneOrMoreArrayUtil.fromArray<JoinedTableWithOnCondition>([
          {
            table: USER,
            joinType: JoinType.Left,
            condition: condition
          }
        ])
      },
      EVENT
    )
  );
});

test("rightJoin adds left join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));

  const queryRunner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryRunner);

  await dsl
    .selectFrom(EVENT)
    .rightJoin(USER)
    .on(condition)
    .fetchAll();

  expect(queryRunner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        joins: OneOrMoreArrayUtil.fromArray<JoinedTableWithOnCondition>([
          {
            table: USER,
            joinType: JoinType.Right,
            condition: condition
          }
        ])
      },
      EVENT
    )
  );
});
