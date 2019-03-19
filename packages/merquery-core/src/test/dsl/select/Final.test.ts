import { StubQueryBuilder, StubQueryRunner } from "../../../testutil/TestUtil";
import { SelectImpl } from "../../../impl/dsl/SelectImpl";
import { EVENT, USER } from "../../../testutil/TestSchema";
import { createSelectStateWithRecordTable } from "../../../impl/createSelectState";

test("asSqlString returns query builder result", () => {
  const builder = StubQueryBuilder({
    representSelectStateAsSqlString: jest.fn().mockReturnValue("Select SQL")
  });

  const selectImpl = SelectImpl.initial(StubQueryRunner(), builder);

  expect(selectImpl.asSqlString()).toBe("Select SQL");
  expect(builder.representSelectStateAsSqlString).toBeCalledWith(
    selectImpl.state
  );
});

test("fetchAll calls query runner executeSelectState - empty result", async () => {
  const runner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const selectImpl = SelectImpl.initial(
    runner,
    StubQueryBuilder()
  ).fromRecordTable(EVENT);

  expect(await selectImpl.fetchAll()).toEqual([]);

  expect(runner.executeSelectState).toBeCalledWith(selectImpl.state);
});

test("fetchAll calls query runner executeSelectState - multiple result", async () => {
  const runner = StubQueryRunner({
    executeSelectState: jest
      .fn()
      .mockResolvedValue([
        { user: { id: 1, name: "Test" } },
        { user: { id: 2, name: "Test2" } }
      ])
  });

  const selectImpl = SelectImpl.initial(
    runner,
    StubQueryBuilder()
  ).fromRecordTable(USER);

  expect(await selectImpl.fetchAll()).toEqual([
    { __ROW_KIND__: "UserRow", id: 1, name: "Test" },
    { __ROW_KIND__: "UserRow", id: 2, name: "Test2" }
  ]);

  expect(runner.executeSelectState).toBeCalledWith(selectImpl.state);
});

test("fetchAll calls query runner executeSelectState - multiple result", async () => {
  const runner = StubQueryRunner({
    executeSelectState: jest
      .fn()
      .mockResolvedValue([
        { user: { id: 1, name: "Test" } },
        { user: { id: 2, name: "Test2" } }
      ])
  });

  const selectImpl = SelectImpl.initial(
    runner,
    StubQueryBuilder()
  ).fromRecordTable(USER);

  expect(await selectImpl.fetchAll()).toEqual([
    { __ROW_KIND__: "UserRow", id: 1, name: "Test" },
    { __ROW_KIND__: "UserRow", id: 2, name: "Test2" }
  ]);

  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({}, USER)
  );
});

test("fetchAll throws error if no recordTable is set", async () => {
  expect.assertions(1);

  const runner = StubQueryRunner({
    executeSelectState: jest
      .fn()
      .mockResolvedValue([{ user: { id: 1, name: "Test" } }])
  });

  const selectImpl = SelectImpl.initial(runner, StubQueryBuilder());

  expect(selectImpl.fetchAll()).rejects.toBeDefined();
});

test("fetchAllMapped throws error if executeSelectState return value is not array", async () => {
  expect.assertions(1);

  const runner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue(null)
  });

  const selectImpl = SelectImpl.initial(runner, StubQueryBuilder());

  expect(selectImpl.fetchAllMapped(() => ({}))).rejects.toBeDefined();
});

test("fetchAll calls query runner executeSelectState - one result", async () => {
  const runner = StubQueryRunner({
    executeSelectState: jest
      .fn()
      .mockResolvedValue([{ user: { id: 1, name: "Test" } }])
  });

  const selectImpl = SelectImpl.initial(
    runner,
    StubQueryBuilder()
  ).fromRecordTable(USER);

  expect(await selectImpl.fetchAll()).toEqual([
    { __ROW_KIND__: "UserRow", id: 1, name: "Test" }
  ]);
  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({}, USER)
  );
});

test("fetchAll calls query runner executeSelectState - multiple result", async () => {
  const runner = StubQueryRunner({
    executeSelectState: jest
      .fn()
      .mockResolvedValue([
        { user: { id: 1, name: "Test" } },
        { user: { id: 2, name: "Test2" } }
      ])
  });

  const selectImpl = SelectImpl.initial(
    runner,
    StubQueryBuilder()
  ).fromRecordTable(USER);

  expect(await selectImpl.fetchAll()).toEqual([
    { __ROW_KIND__: "UserRow", id: 1, name: "Test" },
    { __ROW_KIND__: "UserRow", id: 2, name: "Test2" }
  ]);
  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({}, USER)
  );
});

test("fetchOne calls query runner executeSelectState with limit 1 and returns row when result present", async () => {
  const runner = StubQueryRunner({
    executeSelectState: jest
      .fn()
      .mockResolvedValue([{ user: { id: 1, name: "Test" } }])
  });

  const selectImpl = SelectImpl.initial(
    runner,
    StubQueryBuilder()
  ).fromRecordTable(USER);

  expect(await selectImpl.fetchOne()).toEqual({
    __ROW_KIND__: "UserRow",
    id: 1,
    name: "Test"
  });
  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ limit: 1 }, USER)
  );
});

test("fetchOne calls query runner executeSelectState with limit 1 and returns undefined when no result present", async () => {
  const runner = StubQueryRunner({
    executeSelectState: jest.fn().mockResolvedValue([])
  });

  const selectImpl = SelectImpl.initial(
    runner,
    StubQueryBuilder()
  ).fromRecordTable(USER);

  expect(await selectImpl.fetchOne()).toBeUndefined();
  expect(runner.executeSelectState).toBeCalledWith(
    createSelectStateWithRecordTable({ limit: 1 }, USER)
  );
});

test("asSubQuery returns SubQuery", () => {
  const selectImpl = SelectImpl.initial(StubQueryRunner(), StubQueryBuilder())
    .limit(1)
    .offset(33);

  expect(selectImpl.asSubQuery()).toEqual({ state: selectImpl.state });
});
