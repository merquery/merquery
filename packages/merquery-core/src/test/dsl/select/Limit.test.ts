import {
  StubQueryRunner,
  TestDSL,
  StubQueryBuilder,
  NOT_IMPLEMENTED
} from "../../../testutil/TestUtil";
import { SelectState } from "../../../SelectState";
import { EVENT } from "../../../testutil/TestSchema";
import {
  createSelectStateWithRecordTable,
  createSelectState
} from "../../../impl/createSelectState";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";
import { MysqlConverters } from "../../../impl/driver/mysql/MysqlConverters";

test("limit sets SelectState.limit for 0", async () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );
  expect(selectImpl.limit(0).state).toEqual(createSelectState({ limit: 0 }));
});

test("limit sets SelectState.limit for positive integer", async () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );
  expect(selectImpl.limit(22).state).toEqual(createSelectState({ limit: 22 }));
});

test("limit throws Exception when count is nonnegative", async () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(() => selectImpl.limit(-22)).toThrowError(
    "Limit needs to be nonnegative."
  );
});

test("offset sets SelectState.offset for 0", async () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );
  expect(selectImpl.offset(0).state).toEqual(createSelectState({ offset: 0 }));
});

test("offset throws Exception when count is nonnegative", async () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );

  expect(() => selectImpl.offset(-22)).toThrowError(
    "Offset needs to be nonnegative."
  );
});

test("limit sets SelectState.limit for 22", async () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );
  expect(selectImpl.offset(22).state).toEqual(
    createSelectState({ offset: 22 })
  );
});
