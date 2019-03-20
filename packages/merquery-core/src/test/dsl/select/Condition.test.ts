import {
  StubQueryRunner,
  TestDSL,
  expectState,
  StubQueryBuilder,
  NOT_IMPLEMENTED
} from "../../../testutil/TestUtil";
import { SelectState } from "../../../SelectState";
import { EVENT } from "../../../testutil/TestSchema";
import { ConditionCollection } from "../../../ConditionCollection";
import { ConditionWithOperator } from "../../../ConditionWithOperator";
import { ConditionOperator } from "../../../ConditionOperator";
import {
  createSelectState,
  createSelectStateWithRecordTable
} from "../../../impl/createSelectState";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { eqValue } from "../../../impl/util/eqValue";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";
import { eq } from "../../../impl/util/eq";
import { val } from "../../../impl/util/val";
import { MysqlConverters } from "../../../impl/driver/mysql/MysqlConverters";

test("where adds a condition to SelectState.conditions with AND operator", async () => {
  const condition = eqValue(EVENT.ID.FIELD, 1);
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.where(condition).state).toEqual(
    createSelectState({
      condition: {
        kind: "ConditionCollection",
        conditions: OneOrMoreArrayUtil.fromArray([
          {
            condition: condition,
            operator: ConditionOperator.And
          }
        ])
      }
    })
  );
});

test("and adds a condition to SelectState.conditions with AND operator", async () => {
  const firstCondition = eqValue(EVENT.ID.FIELD, 1);
  const testCondition = eqValue(EVENT.ID.FIELD, 2);

  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.where(firstCondition).and(testCondition).state).toEqual(
    createSelectState({
      condition: {
        kind: "ConditionCollection",
        conditions: OneOrMoreArrayUtil.fromArray([
          {
            condition: firstCondition,
            operator: ConditionOperator.And
          },
          {
            condition: testCondition,
            operator: ConditionOperator.And
          }
        ])
      }
    })
  );
});

test("or adds a condition to SelectState.conditions with OR operator", async () => {
  const firstCondition = eqValue(EVENT.ID.FIELD, 1);
  const testCondition = eqValue(EVENT.ID.FIELD, 2);

  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.where(firstCondition).or(testCondition).state).toEqual(
    createSelectState({
      condition: {
        kind: "ConditionCollection",
        conditions: OneOrMoreArrayUtil.fromArray([
          {
            condition: firstCondition,
            operator: ConditionOperator.And
          },
          {
            condition: testCondition,
            operator: ConditionOperator.Or
          }
        ])
      }
    })
  );
});

test("or throws error when no initial condition set", () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );
  expect(() => selectImpl.or(EVENT.ID.equals(1))).toThrowError(
    "No initial condition set."
  );
});

test("and throws error when no initial condition set", () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );
  expect(() => selectImpl.and(EVENT.ID.equals(1))).toThrowError(
    "No initial condition set."
  );
});

test("combinations of and or builds a ConditionCollection", async () => {
  const t1 = eqValue(EVENT.ID.FIELD, 1);
  const t2 = eqValue(EVENT.NAME.FIELD, "Test");
  const t3 = eqValue(EVENT.ID.FIELD, 5);
  const t4 = eqValue(EVENT.NAME.FIELD, "Hallo");

  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(
    selectImpl
      .where(t1)
      .or(t2)
      .and(t3)
      .and(t4).state
  ).toEqual(
    createSelectState({
      condition: {
        kind: "ConditionCollection",
        conditions: OneOrMoreArrayUtil.fromArray([
          {
            condition: t1,
            operator: ConditionOperator.And
          },
          {
            condition: t2,
            operator: ConditionOperator.Or
          },
          {
            condition: t3,
            operator: ConditionOperator.And
          },
          {
            condition: t4,
            operator: ConditionOperator.And
          }
        ])
      }
    })
  );
});
