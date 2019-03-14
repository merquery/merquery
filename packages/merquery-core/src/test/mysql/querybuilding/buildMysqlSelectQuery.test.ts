import { buildMysqlSelectQuery } from "../../../impl/driver/mysql/querybuilding/buildMysqlSelectQuery";
import {
  createSelectStateWithRecordTable,
  createSelectState
} from "../../../impl/createSelectState";
import { EVENT, USER } from "../../../testutil/TestSchema";
import { ConditionOperator } from "../../../ConditionOperator";
import { eqValue, eq } from "../../../Condition";
import { val } from "../../../Field";
import { JoinType } from "../../../JoinType";
import { OrderDirection } from "../../../OrderDirection";
import { LockMode } from "../../../LockMode";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { ConditionWithOperator } from "../../../ConditionWithOperator";

test("buildMysqlSelectQuery selects all columns when recordTable is set", () => {
  expect(
    buildMysqlSelectQuery(createSelectStateWithRecordTable({}, EVENT))
  ).toBe("SELECT * FROM `projectclub`.`event`");
});

test("buildMysqlSelectQuery selects all columns when column array is empty", () => {
  expect(buildMysqlSelectQuery(createSelectState({}, EVENT))).toBe(
    "SELECT * FROM `projectclub`.`event`"
  );
});

test("buildMysqlSelectQuery with recordTable and columns selects all columns", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable({ columns: [EVENT.ID] }, EVENT)
    )
  ).toBe("SELECT * FROM `projectclub`.`event`");
});

test("buildMysqlSelectQuery selects columns with column array", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectState({ columns: [EVENT.ID, EVENT.NAME] }, EVENT)
    )
  ).toBe(
    "SELECT `projectclub`.`event`.`id`, `projectclub`.`event`.`name` FROM `projectclub`.`event`"
  );
});

test("buildMysqlSelectQuery with SelectState.joins adds join expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          joins: OneOrMoreArrayUtil.fromArray([
            {
              condition: eq(val(1), val(2)),
              joinType: JoinType.Inner,
              table: USER
            },
            {
              condition: eq(val(1), val(2)),
              joinType: JoinType.Left,
              table: USER
            }
          ])
        },
        EVENT
      )
    )
  ).toBe(
    "SELECT * FROM `projectclub`.`event` INNER JOIN `projectclub`.`user` ON (1 = 2) LEFT JOIN `projectclub`.`user` ON (1 = 2)"
  );
});

test("buildMysqlSelectQuery with SelectState.condition adds where expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          condition: {
            kind: "ConditionCollection",
            conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
              {
                operator: ConditionOperator.And,
                condition: eq(val(1), val(2))
              }
            ])
          }
        },
        EVENT
      )
    )
  ).toBe("SELECT * FROM `projectclub`.`event` WHERE 1 = 2");
});

test("buildMysqlSelectQuery with SelectState.groupBy adds group by expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          groupBy: OneOrMoreArrayUtil.just<any>(EVENT.ID, EVENT.NAME)
        },
        EVENT
      )
    )
  ).toBe(
    "SELECT * FROM `projectclub`.`event` GROUP BY `projectclub`.`event`.`id`, `projectclub`.`event`.`name`"
  );
});

test("buildMysqlSelectQuery with SelectState.orderBy adds order by expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          orderBy: OneOrMoreArrayUtil.just({
            direction: OrderDirection.Ascending,
            field: EVENT.ID
          })
        },
        EVENT
      )
    )
  ).toBe(
    "SELECT * FROM `projectclub`.`event` ORDER BY `projectclub`.`event`.`id` ASC"
  );
});

test("buildMysqlSelectQuery with SelectState.limit adds limit expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          limit: 10
        },
        EVENT
      )
    )
  ).toBe("SELECT * FROM `projectclub`.`event` LIMIT 10");
});

test("buildMysqlSelectQuery with SelectState.offset and SelectState.limit adds offset expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          limit: 10,
          offset: 11
        },
        EVENT
      )
    )
  ).toBe("SELECT * FROM `projectclub`.`event` LIMIT 10 OFFSET 11");
});

test("buildMysqlSelectQuery with only SelectState.offset is ignored", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          offset: 11
        },
        EVENT
      )
    )
  ).toBe("SELECT * FROM `projectclub`.`event`");
});

test("buildMysqlSelectQuery with SelectState.having adds having expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          having: eq(val(1), val(2))
        },
        EVENT
      )
    )
  ).toBe("SELECT * FROM `projectclub`.`event` HAVING 1 = 2");
});

test("buildMysqlSelectQuery with SelectState.lockMode adds lock mode expression", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectStateWithRecordTable(
        {
          lockMode: LockMode.ForUpdate
        },
        EVENT
      )
    )
  ).toBe("SELECT * FROM `projectclub`.`event` FOR UPDATE");
});

test("buildMysqlSelectQuery with all present builds all clauses", () => {
  expect(
    buildMysqlSelectQuery(
      createSelectState(
        {
          lockMode: LockMode.ForUpdate,
          columns: [EVENT.ID],
          limit: 10,
          offset: 11,
          joins: OneOrMoreArrayUtil.just({
            condition: eq(val(1), val(2)),
            joinType: JoinType.Left,
            table: USER
          }),
          orderBy: OneOrMoreArrayUtil.just({
            direction: OrderDirection.Ascending,
            field: EVENT.ID
          }),
          having: eq(val(1), val(2)),
          groupBy: OneOrMoreArrayUtil.just(EVENT.ID),
          condition: {
            kind: "ConditionCollection",
            conditions: OneOrMoreArrayUtil.just({
              condition: eq(val(1), val(2)),
              operator: ConditionOperator.And
            })
          }
        },
        EVENT
      )
    )
  ).toBe(
    "SELECT `projectclub`.`event`.`id` FROM `projectclub`.`event` LEFT JOIN `projectclub`.`user` ON (1 = 2) WHERE 1 = 2 GROUP BY `projectclub`.`event`.`id` HAVING 1 = 2 ORDER BY `projectclub`.`event`.`id` ASC LIMIT 10 OFFSET 11 FOR UPDATE"
  );
});
