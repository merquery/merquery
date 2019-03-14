import { QueryRunner } from "./QueryRunner";
import { Driver } from "./Driver";
export interface DSLConfig {
  driver: Driver;
  queryRunner?: QueryRunner;
}
