import { QueryRunner } from "./QueryRunner";
import { Schema } from "./Schema";
export interface Driver {
  createQueryRunner(): QueryRunner;
  createSchema(): Schema;
}
