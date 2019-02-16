import { DSLContext } from "../DSLContext";
import { Table } from "../TableLike";
import { SelectWhereStep } from "../SelectWhereStep";
import { SelectImpl } from "./SelectImpl";
import { Row } from "../Row";
import { QueryRunner } from "../QueryRunner";
import { SelectJoinStep } from "../SelectJoinStep";
import { TransactionContext } from "../TransactionContext";
import { MysqlQueryRunner } from "./driver/mysql/MysqlQueryRunner";
import { DSLConfig } from "../DSLConfig";
import { ResultQuery } from "../ResultQuery";
import { SelectFromStep } from "../SelectFromStep";
import { Field } from "../Field";
import { SubQuery } from "../SubQuery";

export class DSLContextImpl implements DSLContext {
  select(...field: Field<any>[]): SelectFromStep<Row> {
    return SelectImpl.initial<Row>(this.queryRunner).select(...field);
  }
  private queryRunner: QueryRunner;

  constructor(private config: DSLConfig) {
    this.queryRunner = config.queryRunner || config.driver.createQueryRunner();
  }

  selectFrom<R extends Row>(table: Table<R>): SelectJoinStep<R> {
    return SelectImpl.initial<R>(this.queryRunner).fromRecordTable(table);
  }

  async transaction<R>(
    cb: (configuration: DSLConfig) => Promise<R>
  ): Promise<R> {
    const queryRunner =
      this.config.queryRunner || this.config.driver.createQueryRunner();

    try {
      await queryRunner.beginTransaction();
      const res = await cb({
        queryRunner: queryRunner,
        driver: this.config.driver
      });
      await queryRunner.commit();

      return res;
    } catch (e) {
      await queryRunner.rollBack();
      throw e;
    } finally {
      if (!this.config.queryRunner) queryRunner.release();
    }
  }
}
