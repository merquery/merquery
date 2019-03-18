import { DeleteImpl } from "../../../impl/dsl/DeleteImpl";
import { StubQueryRunner, StubQueryBuilder } from "../../../testutil/TestUtil";
import { MysqlQueryBuilder } from "../../../impl/driver/mysql/MysqlQueryBuilder";
import { EVENT } from "../../../testutil/TestSchema";

test("asSqlString returns query builder result", () => {
  const builder = StubQueryBuilder({
    representDeleteStateAsSqlString: jest.fn().mockReturnValue("Delete SQL")
  });

  const deleteImpl = DeleteImpl.initial(StubQueryRunner(), builder, EVENT);

  expect(deleteImpl.asSqlString()).toBe("Delete SQL");
  expect(builder.representDeleteStateAsSqlString).toBeCalledWith(
    deleteImpl.state
  );
});

test("execute calls query runner executeDeleteState", async () => {
  const runner = StubQueryRunner({
    executeDeleteState: jest.fn().mockResolvedValue(null)
  });

  const deleteImpl = DeleteImpl.initial(runner, StubQueryBuilder(), EVENT);

  await deleteImpl.execute();

  expect(runner.executeDeleteState).toBeCalledWith(deleteImpl.state);
});
