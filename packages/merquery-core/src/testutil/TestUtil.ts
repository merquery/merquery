import { QueryRunner } from "../QueryRunner";
import { DSL } from "../impl/dsl/DSL";
import { SelectState } from "../SelectState";
import { QueryBuilder } from "../QueryBuilder";
import { Converter } from "../Converter";
import { MysqlConverterFactory } from "../impl/driver/mysql/conversion/MysqlConverterFactory";
import { ConverterFactory } from "../ConverterFactory";
import { Converters } from "../Converters";
import { MysqlConverters } from "../impl/driver/mysql/MysqlConverters";
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

export function StubQueryRunner(props?: Partial<QueryRunner>): QueryRunner {
  return {
    beginTransaction: NOT_IMPLEMENTED,
    commit: NOT_IMPLEMENTED,
    rollBack: NOT_IMPLEMENTED,
    release: NOT_IMPLEMENTED,
    executeSelectState: NOT_IMPLEMENTED,
    executeUpdateState: NOT_IMPLEMENTED,
    executeInsertState: NOT_IMPLEMENTED,
    executeDeleteState: NOT_IMPLEMENTED,
    ...props
  };
}

export function TestSetup() {
  const runner = StubQueryRunner({
    executeInsertState: jest.fn(),
    executeSelectState: jest.fn().mockResolvedValue([]),
    executeUpdateState: jest.fn()
  });

  return {
    dsl: TestDSL(runner),
    runner: runner
  };
}

export function StubQueryBuilder(methods?: Partial<QueryBuilder>) {
  return {
    representDeleteStateAsSqlString: NOT_IMPLEMENTED,
    representInsertStateAsSqlString: NOT_IMPLEMENTED,
    representSelectStateAsSqlString: NOT_IMPLEMENTED,
    representUpdateStateAsSqlString: NOT_IMPLEMENTED,
    ...methods
  };
}

export function TestDSL(
  runner?: QueryRunner,
  queryBuilder?: QueryBuilder,
  converters?: Converters
) {
  return DSL.withDriver({
    createQueryRunner: () => runner || StubQueryRunner(),
    createQueryBuilder: () => queryBuilder || StubQueryBuilder(),
    createSchema: NOT_IMPLEMENTED,
    createConverters: () => converters || MysqlConverters
  });
}
