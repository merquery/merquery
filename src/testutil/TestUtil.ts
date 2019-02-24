import { QueryRunner } from "../QueryRunner";
import { DSL } from "../impl/dsl/DSL";
export const NOT_IMPLEMENTED = () => {
  throw new Error("Not implemented");
};

export function StubQueryRunner(props: Partial<QueryRunner>): QueryRunner {
  return {
    beginTransaction: NOT_IMPLEMENTED,
    commit: NOT_IMPLEMENTED,
    rollBack: NOT_IMPLEMENTED,
    release: NOT_IMPLEMENTED,
    executeSelectState: NOT_IMPLEMENTED,
    representSelectStateAsSqlString: NOT_IMPLEMENTED,
    executeInsertState: NOT_IMPLEMENTED,
    ...props
  };
}

export function TestDSL(runner: QueryRunner) {
  return DSL.withDriver({
    createQueryRunner: () => runner,
    createSchema: NOT_IMPLEMENTED
  });
}
