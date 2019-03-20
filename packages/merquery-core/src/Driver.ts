import { QueryRunner } from "./QueryRunner";
import { Schema } from "./Schema";
import { QueryBuilder } from "./QueryBuilder";
import { Converter } from "./Converter";
import { DataTypeProps } from "./DataTypeProps";
import { BaseConverter } from "./impl/driver/mysql/conversion/BaseConverter";
import { Converters } from "./Converters";
export interface Driver {
  createQueryRunner(): QueryRunner;
  createQueryBuilder(): QueryBuilder;
  createSchema(): Schema;
  createConverters(): Converters;
}
