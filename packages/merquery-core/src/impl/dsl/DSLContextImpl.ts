import { DSLContext } from "../../DSLContext";
import { Table } from "../../TableLike";
import { SelectWhereStep } from "../../SelectWhereStep";
import { SelectImpl } from "./SelectImpl";
import { Row } from "../../Row";
import { QueryRunner } from "../../QueryRunner";
import { SelectJoinStep } from "../../SelectJoinStep";
import { TransactionContext } from "../../TransactionContext";
import { MysqlQueryRunner } from "../driver/mysql/MysqlQueryRunner";
import { DSLConfig } from "../../DSLConfig";
import { ResultQuery } from "../../ResultQuery";
import { SelectFromStep } from "../../SelectFromStep";
import { Field, TableField } from "../../Field";
import { SubQuery } from "../../SubQuery";
import { InsertImpl } from "./InsertImpl";
import { UpdateSetStep } from "../../UpdateSetStep";
import { UpdateImpl } from "./UpdateImpl";
import { DeleteWhereStep } from "../../DeleteWhereStep";
import { DeleteImpl } from "./DeleteImpl";

export class DSLContextImpl implements DSLContext {
  private queryRunner: QueryRunner;

  constructor(private config: DSLConfig) {
    this.queryRunner = config.queryRunner || config.driver.createQueryRunner();
  }

  update<R extends Row>(table: Table<R>): UpdateSetStep<R> {
    return UpdateImpl.initial(this.queryRunner, table);
  }

  insertInto<R extends Row>(
    table: Table<R>,
    ...fields: TableField<R, any>[]
  ): InsertImpl<R> {
    return InsertImpl.initial(this.queryRunner, table, ...fields);
  }

  select(...field: Field<any>[]): SelectFromStep<Row> {
    return SelectImpl.initial<Row>(this.queryRunner).select(...field);
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

  deleteFrom<R extends Row>(table: Table<R>): DeleteWhereStep<R> {
    return DeleteImpl.initial(this.queryRunner, table);
  }
}
