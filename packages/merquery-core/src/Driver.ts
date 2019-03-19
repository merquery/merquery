import { QueryRunner } from "./QueryRunner";
import { Schema } from "./Schema";
import { QueryBuilder } from "./QueryBuilder";
export interface Driver {
  createQueryRunner(): QueryRunner;
  createQueryBuilder(): QueryBuilder;
  createSchema(): Schema;
}
