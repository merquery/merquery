import {
  StubQueryRunner,
  TestDSL,
  TestSetup,
  StubQueryBuilder
} from "../../../testutil/TestUtil";
import { InsertState } from "../../../InsertState";
import { EVENT } from "../../../testutil/TestSchema";
import { val } from "../../../impl/util/val";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { InsertImpl } from "../../../impl/dsl/InsertImpl";

test("insert without values has empty values array in InsertState", async () => {
  const insertDsl = InsertImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT
  );

  expect(insertDsl.state).toEqual({
    table: EVENT,
    fields: [],
    values: []
  });
});

test("insert with one values has 1 values entry in array in InsertState", async () => {
  const insertDsl = InsertImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT,
    EVENT.ID.FIELD,
    EVENT.NAME.FIELD
  );

  expect(insertDsl.values(1, "Test").state).toEqual({
    table: EVENT,
    fields: [EVENT.ID.FIELD, EVENT.NAME.FIELD],
    values: [[val(1), val("Test")]]
  });
});

test("insert with 2 values has 2 values entry in array in InsertState", async () => {
  const insertDsl = InsertImpl.initial(
    StubQueryRunner(),
    StubQueryBuilder(),
    EVENT,
    EVENT.ID.FIELD,
    EVENT.NAME.FIELD
  );

  expect(insertDsl.values(1, "Test").values(2, "Test2").state).toEqual({
    table: EVENT,
    fields: [EVENT.ID.FIELD, EVENT.NAME.FIELD],
    values: [[val(1), val("Test")], [val(2), val("Test2")]]
  });
});
