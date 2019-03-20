import { val } from "../../../impl/util/val";
import {
  StubQueryRunner,
  TestDSL,
  expectSelectState,
  StubQueryBuilder,
  NOT_IMPLEMENTED
} from "../../../testutil/TestUtil";
import { SelectState } from "../../../SelectState";
import { EVENT, USER } from "../../../testutil/TestSchema";
import { JoinType } from "../../../JoinType";
import {
  createSelectStateWithRecordTable,
  createSelectState
} from "../../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { JoinedTableWithOnCondition } from "../../../JoinedTableWithOnCondition";
import { eq } from "../../../impl/util/eq";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";
import { MysqlConverters } from "../../../impl/driver/mysql/MysqlConverters";

test("innerJoin adds inner join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.innerJoin(USER).on(condition).state).toEqual(
    createSelectState({
      joins: OneOrMoreArrayUtil.fromArray<JoinedTableWithOnCondition>([
        {
          table: USER,
          joinType: JoinType.Inner,
          condition: condition
        }
      ])
    })
  );
});

test("leftJoin adds left join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.leftJoin(USER).on(condition).state).toEqual(
    createSelectState({
      joins: OneOrMoreArrayUtil.fromArray<JoinedTableWithOnCondition>([
        {
          table: USER,
          joinType: JoinType.Left,
          condition: condition
        }
      ])
    })
  );
});

test("rightJoin adds right join to SelectState.joins", async () => {
  const condition = eq(val(1), val(2));
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.rightJoin(USER).on(condition).state).toEqual(
    createSelectState({
      joins: OneOrMoreArrayUtil.fromArray<JoinedTableWithOnCondition>([
        {
          table: USER,
          joinType: JoinType.Right,
          condition: condition
        }
      ])
    })
  );
});

test("on throws error if not in correct state", async () => {
  const condition = eq(val(1), val(2));
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(() => selectImpl.on(condition)).toThrowError(
    "Temporary joined table is not set."
  );
});
