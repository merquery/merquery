import { MysqlDriver, DSL } from "merquery-core";
import { USER, UserRow } from "./merquery";

const driver = new MysqlDriver({
  host: "localhost",
  user: "root",
  password: "",
  database: "merquerysample"
});

const dsl = DSL.withDriver(driver);

async function main() {
  await dsl
    .insertInto(USER, USER.ID.FIELD, USER.USERNAME.FIELD, USER.LAST_LOGIN.FIELD)
    .values("123", "Test", 3)
    .execute();
}

main().catch(console.error);
