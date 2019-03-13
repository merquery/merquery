import { StubQueryRunner, TestDSL } from "../../../testutil/TestUtil";
import { DSL } from "../../../impl/dsl/DSL";
import { EVENT } from "../../../testutil/TestSchema";
import { createSelectStateWithRecordTable } from "../../../impl/createSelectState";
import { OrderDirection } from "../../../OrderDirection";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";

test("orderByAscending adds a ascending order to SelectState.orderBy", async () => {
  const queryBuilder = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryBuilder);

  await dsl
    .selectFrom(EVENT)
    .orderByAscending(EVENT.ID)
    .fetchAll();

  expect(queryBuilder.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        orderBy: OneOrMoreArrayUtil.just({
          direction: OrderDirection.Ascending,
          field: EVENT.ID
        })
      },
      EVENT
    )
  );
});

test("orderByDescending adds a descending order to SelectState.orderBy", async () => {
  const queryBuilder = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryBuilder);

  await dsl
    .selectFrom(EVENT)
    .orderByDescending(EVENT.ID)
    .fetchAll();

  expect(queryBuilder.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        orderBy: OneOrMoreArrayUtil.just({
          direction: OrderDirection.Descending,
          field: EVENT.ID
        })
      },
      EVENT
    )
  );
});

test("multiple orderBys adds multiple order to SelectState.orderBy", async () => {
  const queryBuilder = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const dsl = TestDSL(queryBuilder);

  await dsl
    .selectFrom(EVENT)
    .orderByDescending(EVENT.ID)
    .orderByAscending(EVENT.ID)
    .fetchAll();

  expect(queryBuilder.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable(
      {
        orderBy: OneOrMoreArrayUtil.just(
          {
            direction: OrderDirection.Descending,
            field: EVENT.ID
          },
          {
            direction: OrderDirection.Ascending,
            field: EVENT.ID
          }
        )
      },
      EVENT
    )
  );
});
