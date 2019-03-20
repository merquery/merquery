import {
  StubQueryRunner,
  expectSelectState,
  expectState,
  TestDSL
} from "../../../testutil/TestUtil";
import { EVENT } from "../../../testutil/TestSchema";
import { UpdateState } from "../../../UpdateState";
import { val } from "../../../impl/util/val";

test("set adds one change to UpdateState.updates", () => {
  const queryRunner = StubQueryRunner({
    executeUpdateState: jest.fn()
  });

  const dsl = TestDSL(queryRunner);

  dsl
    .update(EVENT)
    .set(EVENT.ID.FIELD, 123)
    .withoutWhere()
    .execute();

  expect(queryRunner.executeUpdateState).toBeCalledWith({
    table: EVENT,
    updates: [
      { kind: "TableValueField", tableField: EVENT.ID.FIELD, value: 123 }
    ]
  });
});

test("multiple set adds multiple to UpdateState.updates", () => {
  const queryRunner = StubQueryRunner({
    executeUpdateState: jest.fn()
  });

  const dsl = TestDSL(queryRunner);

  dsl
    .update(EVENT)
    .set(EVENT.ID.FIELD, 123)
    .set(EVENT.NAME.FIELD, "Name")
    .set(EVENT.DESCRIPTION.FIELD, "Description")
    .withoutWhere()
    .execute();

  expect(queryRunner.executeUpdateState).toBeCalledWith({
    table: EVENT,
    updates: [
      { kind: "TableValueField", tableField: EVENT.ID.FIELD, value: 123 },
      { kind: "TableValueField", tableField: EVENT.NAME.FIELD, value: "Name" },
      {
        kind: "TableValueField",
        tableField: EVENT.DESCRIPTION.FIELD,
        value: "Description"
      }
    ]
  });
});
