import { QueryRunner } from "../../../QueryRunner";
import { SelectState } from "../../../SelectState";
import { Table } from "../../../TableLike";
import { assertNever } from "../../Util";
import { Condition, ComperatorCondition, Comperator } from "../../../Condition";
import { Field, ValueField, TableField } from "../../../Field";
import { ConditionOperator } from "../../../ConditionOperator";
import _ = require("lodash");
import { ConditionWithOperator } from "../../../ConditionWithOperator";
import { FieldCollection } from "../../../FieldCollection";
import { OrderByWithDirection } from "../../../OrderByWithDirection";
import { OrderDirection } from "../../../OrderDirection";
import { MysqlDriver } from "./MysqlDriver";
import { Row } from "../../../Row";
import { ResultRow } from "../../../QueryResult";
import { PoolConnection, QueryOptions } from "mysql";
import { FromPart, TableFromPart, SubQueryFromPart } from "../../../FromPart";
import * as SqlString from "sqlstring";
import { buildMysqlSelectQuery } from "./querybuilding/buildMysqlSelectQuery";
import { InsertState } from "../../../InsertState";
import { buildMysqlInsertQuery } from "./querybuilding/buildMysqlInsertQuery";
import { buildIdentifier } from "./querybuilding/buildIdentifier";

export interface TableDef {
  TABLE_SCHEMA: string;
  TABLE_NAME: string;
}

export interface TableColumn {
  Field: string;
  Type: string;
}

export class MysqlQueryRunner implements QueryRunner {
  private connectionPromise?: Promise<PoolConnection>;
  private connection?: PoolConnection;
  private released: boolean = false;
  private isTransactionActive: boolean = false;

  constructor(private driver: MysqlDriver) {}

  executeInsertState(query: InsertState<any>): Promise<void> {
    const q = buildMysqlInsertQuery(query);
    return this.query(q).then(() => {});
  }

  representSelectStateAsSqlString(state: SelectState<any>): string {
    return buildMysqlSelectQuery(state);
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
        console.log("Res", result);

        err ? reject(err) : resolve(result);
      });
    });
  }

  async queryResult(query: string): Promise<ResultRow[]> {
    const connection = await this.getConnection();
    return new Promise((resolve, reject) => {
      console.log(`Executing ${query}`);

      connection.query(
        { nestTables: true, sql: query } as QueryOptions,
        (err, result) => {
          console.log("Res", result);

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

  async executeSelectState(query: SelectState<any>): Promise<ResultRow[]> {
    return this.queryResult(this.representSelectStateAsSqlString(query));
  }
}
