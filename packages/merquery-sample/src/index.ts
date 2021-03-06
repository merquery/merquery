import { MysqlDriver, DSL } from "merquery-core";
import { UserRepository } from "./UserRepository";
const driver = new MysqlDriver({
  host: "localhost",
  user: "root",
  password: "",
  database: "merquerysample"
});

async function main() {
  const dsl = DSL.withDriver(driver);
  const repository = new UserRepository(dsl);

  await repository.createUser("1", "Bob");
  await repository.upgradeToPremium("1");
  console.log(await repository.fetchPaidUsers());
  await repository.deleteUser("1");
}

main().catch(console.error);
