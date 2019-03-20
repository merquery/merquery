import {
  StubQueryRunner,
  expectSelectState,
  TestDSL,
  StubQueryBuilder,
  NOT_IMPLEMENTED
} from "../../../testutil/TestUtil";
import { val } from "../../../impl/util/val";
import { EVENT } from "../../../testutil/TestSchema";
import {
  createSelectStateWithRecordTable,
  createSelectState
} from "../../../impl/createSelectState";
import { eq } from "../../../impl/util/eq";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";
import { MysqlConverters } from "../../../impl/driver/mysql/MysqlConverters";

test("having sets SelectState.having", async () => {
  const selectImpl = SelectImpl.initial(
    MysqlConverters,
    StubQueryRunner(),
    StubQueryBuilder()
  );
  const condition = eq(val(1), val(2));

  expect(selectImpl.having(condition).state).toEqual(
    createSelectState({
      having: condition
    })
  );
});
