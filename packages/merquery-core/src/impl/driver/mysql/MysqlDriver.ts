import { Driver } from "../../../Driver";
import { QueryRunner } from "../../../QueryRunner";
import { MysqlQueryRunner } from "./MysqlQueryRunner";
import {
  createConnection,
  createPool,
  Pool,
  PoolConfig,
  PoolConnection
} from "mysql";
import { Schema } from "../../../Schema";
import { MysqlSchema } from "./MysqlSchema";
import { QueryBuilder } from "../../../QueryBuilder";
import { MysqlQueryBuilder } from "./MysqlQueryBuilder";
import { Converter } from "../../../Converter";
import { DataTypeProps } from "../../..";
import { BaseConverter } from "./conversion/BaseConverter";
import { DateConverter } from "./conversion/DateConverter";
import { EnumConverter } from "./conversion/EnumConverter";
import { IntegerConverter } from "./conversion/IntegerConverter";
import { StringConverter } from "./conversion/StringConverter";
import { MysqlConverterFactory } from "./conversion/MysqlConverterFactory";
import { Converters } from "../../../Converters";
import { MysqlConverters } from "./MysqlConverters";

export interface MysqlDriverOptions {
  host: string;
  name: string;
  password: string;
}

export class MysqlDriver implements Driver {
  private pool: Pool;

  constructor(private readonly options: PoolConfig) {
    this.pool = createPool(options);
  }

  createConverters(): Converters {
    return MysqlConverters;
  }

  createConverter(props: DataTypeProps): BaseConverter<DataTypeProps, any> {
    return MysqlConverterFactory(props);
  }

  createQueryBuilder(): MysqlQueryBuilder {
    return new MysqlQueryBuilder();
  }

  createSchema(): Schema {
    if (!this.options.database)
      throw new Error("Database must be set to create MysqlSchema");

    return new MysqlSchema(this, this.options.database);
  }

  async getConnection() {
    return new Promise<PoolConnection>((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        err ? reject(err) : resolve(connection);
      });
    });
  }

  createQueryRunner(): MysqlQueryRunner {
    return new MysqlQueryRunner(this);
  }
}
