import { StubQueryBuilder, StubQueryRunner } from "../../../testutil/TestUtil";
import { InsertImpl } from "../../../impl/dsl/InsertImpl";
import { EVENT } from "../../../testutil/TestSchema";

test("asSqlString returns query builder result", () => {
  const builder = StubQueryBuilder({
    representInsertStateAsSqlString: jest.fn().mockReturnValue("Insert SQL")
  });

  const insertImpl = InsertImpl.initial(StubQueryRunner(), builder, EVENT);

  expect(insertImpl.asSqlString()).toBe("Insert SQL");
  expect(builder.representInsertStateAsSqlString).toBeCalledWith(
    insertImpl.state
  );
});

test("execute calls query runner executeDeleteState", async () => {
  const runner = StubQueryRunner({
    executeInsertState: jest.fn().mockResolvedValue(null)
  });

  const insertImpl = InsertImpl.initial(runner, StubQueryBuilder(), EVENT);

  await insertImpl.execute();

  expect(runner.executeInsertState).toBeCalledWith(insertImpl.state);
});
