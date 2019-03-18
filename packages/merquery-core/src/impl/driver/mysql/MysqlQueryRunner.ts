import { MysqlDriver } from "./MysqlDriver";
import { ResultRow } from "../../../ResultRow";
import { PoolConnection, QueryOptions } from "mysql";
import * as SqlString from "sqlstring";
import { buildMysqlSelectQuery } from "./querybuilding/buildMysqlSelectQuery";
import { InsertState } from "../../../InsertState";
import { buildMysqlInsertQuery } from "./querybuilding/buildMysqlInsertQuery";
import { buildIdentifier } from "./querybuilding/buildIdentifier";
import { UpdateState } from "../../../UpdateState";
import { buildMysqlUpdateQuery } from "./querybuilding/buildMysqlUpdateQuery";
import { QueryRunner } from "../../../QueryRunner";
import { SelectState } from "../../../SelectState";
import { DeleteState } from "../../../DeleteState";
import { MysqlQueryBuilder } from "./MysqlQueryBuilder";

export interface TableDef {
  TABLE_SCHEMA: string;
  TABLE_NAME: string;
}

export interface TableColumn {
  Field: string;
  Type: string;
  Null: "YES" | "NO";
}

export class MysqlQueryRunner implements QueryRunner {
  private connectionPromise?: Promise<PoolConnection>;
  private connection?: PoolConnection;
  private released: boolean = false;
  private isTransactionActive: boolean = false;
  private queryBuilder: MysqlQueryBuilder;

  constructor(private driver: MysqlDriver) {
    this.queryBuilder = driver.createQueryBuilder();
  }

  executeDeleteState(query: DeleteState<any>): Promise<void> {
    return this.query(
      this.queryBuilder.representDeleteStateAsSqlString(query)
    ).then(() => {});
  }

  executeUpdateState(query: UpdateState<any>): Promise<void> {
    return this.query(
      this.queryBuilder.representUpdateStateAsSqlString(query)
    ).then(() => {});
  }

  executeInsertState(query: InsertState<any>): Promise<void> {
    return this.query(
      this.queryBuilder.representInsertStateAsSqlString(query)
    ).then(() => {});
  }

  executeSelectState(query: SelectState<any>): Promise<ResultRow[]> {
    return this.queryResult(
      this.queryBuilder.representSelectStateAsSqlString(query)
    );
  }

  fetchTableDefinitions(schema: string): Promise<TableDef[]> {
    return this.query(
      `SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = ${SqlString.escape(
        schema
      )}`
    );
  }

  fetchTableColumns(schema: string, tableName: string): Promise<TableColumn[]> {
    return this.query(
      `SHOW FULL COLUMNS FROM ${buildIdentifier(schema, tableName)}`
    );
  }

  release(): void {
    this.released = true;

    if (!this.connectionPromise) return;

    this.connectionPromise.then(connection => {
      connection.destroy();
    });
  }

  private throwIfReleased() {
    if (this.released) throw new Error("Query runner is released");
  }

  async getConnection() {
    this.throwIfReleased();
    if (this.connectionPromise) return this.connectionPromise;
    this.connectionPromise = this.driver.getConnection();

    return this.connectionPromise.then(connection => {
      if (!this.connection) this.connection = connection;

      this.throwIfReleased();
      return connection;
    });
  }

  getCurrentConnection() {
    this.throwIfReleased();
    if (!this.connection) throw new Error("No current connection present");

    return this.connection;
  }

  async query(query: string): Promise<any[]> {
    const connection = await this.getConnection();
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  async queryResult(query: string): Promise<ResultRow[]> {
    const connection = await this.getConnection();
    return new Promise((resolve, reject) => {
      connection.query(
        { nestTables: true, sql: query } as QueryOptions,
        (err, result) => {
          err ? reject(err) : resolve(result);
        }
      );
    });
  }

  async beginTransaction(): Promise<void> {
    if (this.isTransactionActive)
      throw new Error("Transaction already started");

    this.isTransactionActive = true;

    await this.queryResult("START TRANSACTION");
  }

  async commit(): Promise<void> {
    if (!this.isTransactionActive) throw new Error("Transaction not started");

    await this.queryResult("COMMIT");
    this.isTransactionActive = false;
  }
  async rollBack(): Promise<void> {
    if (!this.isTransactionActive) throw new Error("Transaction not started");

    await this.queryResult("ROLLBACK");
    this.isTransactionActive = false;
  }
}
