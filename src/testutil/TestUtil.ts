import { QueryRunner } from "../QueryRunner";
import { DSL } from "../impl/dsl/DSL";
import { SelectState } from "../SelectState";
export const NOT_IMPLEMENTED = () => {
  throw new Error("Not implemented");
};

export function expectState<T>(cb: (state: T) => void) {
  const a = jest.fn(async (state: T) => {
    return cb(state);
  });

  return a;
}

export function expectSelectState(cb: (state: SelectState<any>) => void) {
  const a = jest.fn(async (state: SelectState<any>) => {
    cb(state);
    return [];
  });

  return a;
}

export function StubQueryRunner(props: Partial<QueryRunner>): QueryRunner {
  return {
    beginTransaction: NOT_IMPLEMENTED,
    commit: NOT_IMPLEMENTED,
    rollBack: NOT_IMPLEMENTED,
    release: NOT_IMPLEMENTED,
    executeSelectState: NOT_IMPLEMENTED,
    executeUpdateState: NOT_IMPLEMENTED,
    representSelectStateAsSqlString: NOT_IMPLEMENTED,
    executeInsertState: NOT_IMPLEMENTED,
    representInsertStateAsSqlString: NOT_IMPLEMENTED,
    representUpdateStateAsSqlString: NOT_IMPLEMENTED,
    ...props
  };
}

export function TestDSL(runner: QueryRunner) {
  return DSL.withDriver({
    createQueryRunner: () => runner,
    createSchema: NOT_IMPLEMENTED
  });
}
