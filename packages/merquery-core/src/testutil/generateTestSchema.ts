import { generate } from "../impl/codegen/generate";
import { MysqlDriver } from "../impl/driver/mysql/MysqlDriver";
import Project from "ts-morph";

const driver = new MysqlDriver({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectclub"
});

generate({
  merqueryModule: "..",
  project: new Project({
    tsConfigFilePath: "./tsconfig.json"
  }),
  schema: driver.createSchema(),
  outFile: "src/testutil/TestSchema.ts"
});
