import { DSLContextImpl } from "./impl/DSLContextImpl";
import { Table, subQueryTable } from "./TableLike";
import { Row } from "./Row";
import { TableField, fieldOf } from "./Field";
import { eqValue, eq } from "./Condition";
import { MysqlQueryRunner } from "./impl/driver/mysql/MysqlQueryRunner";
import { Schema } from "./Schema";
import { generate } from "./impl/generate";
import { createConnection } from "mysql";
import { i } from "./Util";
import { MysqlDriver } from "./impl/driver/mysql/MysqlDriver";
import { DSL } from "./impl/DSL";
import { RowUtility } from "./impl/RowUtility";
import { EVENT, USER, EventRow } from "./testutil/TestSchema";

const driver = new MysqlDriver({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectclub"
});

async function main() {
  const dsl = DSL.withDriver(driver);
  const table = subQueryTable(
    dsl
      .select(EVENT.ID)
      .from(EVENT)
      .asSubquery(),
    "test"
  );
  const eventId = fieldOf(table, USER.ID);

  const result = dsl
    .select(eventId)
    .from(table)
    .where(
      DSL.condition(eqValue(eventId, 1))
        .or(eqValue(eventId, 2))
        .getCondition()
    )
    .limit(2)
    .asSqlString();

  console.log(result);

  console.log(await generate(driver.createSchema()));
}

main().catch(console.error);
