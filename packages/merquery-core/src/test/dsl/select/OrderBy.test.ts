import {
  StubQueryRunner,
  TestDSL,
  StubQueryBuilder,
  NOT_IMPLEMENTED
} from "../../../testutil/TestUtil";
import { DSL } from "../../../impl/dsl/DSL";
import { EVENT } from "../../../testutil/TestSchema";
import {
  createSelectStateWithRecordTable,
  createSelectState
} from "../../../impl/createSelectState";
import { OrderDirection } from "../../../OrderDirection";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";

test("orderByAscending adds a ascending order to SelectState.orderBy", async () => {
  const selectImpl = SelectImpl.initial(
    NOT_IMPLEMENTED,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.orderByAscending(EVENT.ID.FIELD).state).toEqual(
    createSelectState({
      orderBy: OneOrMoreArrayUtil.just({
        direction: OrderDirection.Ascending,
        field: EVENT.ID.FIELD
      })
    })
  );
});

test("orderByDescending adds a descending order to SelectState.orderBy", async () => {
  const selectImpl = SelectImpl.initial(
    NOT_IMPLEMENTED,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(selectImpl.orderByDescending(EVENT.ID.FIELD).state).toEqual(
    createSelectState({
      orderBy: OneOrMoreArrayUtil.just({
        direction: OrderDirection.Descending,
        field: EVENT.ID.FIELD
      })
    })
  );
});

test("multiple orderBys adds multiple order to SelectState.orderBy", async () => {
  const selectImpl = SelectImpl.initial(
    NOT_IMPLEMENTED,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(
    selectImpl
      .orderByDescending(EVENT.ID.FIELD)
      .orderByAscending(EVENT.ID.FIELD).state
  ).toEqual(
    createSelectState({
      orderBy: OneOrMoreArrayUtil.just(
        {
          direction: OrderDirection.Descending,
          field: EVENT.ID.FIELD
        },
        {
          direction: OrderDirection.Ascending,
          field: EVENT.ID.FIELD
        }
      )
    })
  );
});
