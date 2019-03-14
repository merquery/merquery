import * as minimist from "minimist";
import { generate } from "./codegen/generate";
import { readFileSync } from "fs";
import Project from "ts-morph";
import { MysqlDriver } from "./driver/mysql/MysqlDriver";
import { Driver } from "../Driver";

function createDriver(config: any): Driver {
  return new MysqlDriver({
    host: "localhost",
    user: "root",
    password: "",
    database: "projectclub"
  });
}

async function generateCmd(argv: minimist.ParsedArgs) {
  const merqueryConfigPath = argv["merqueryConfig"] || "./merquery.json";

  const config = JSON.parse(readFileSync(merqueryConfigPath).toString());
  const tsConfigFilePath =
    argv["tsConfig"] || config.tsConfig || "./tsconfig.json";

  const outFile = argv["outFile"] || config.outFile || "src/merquery.ts";
  const merqueryModule =
    argv["merqueryModule"] || config.merqueryModule || "merquery";

  const driver = createDriver(config);

  console.log(`Generating definitions into ${outFile}`);
  await generate({
    merqueryModule: merqueryModule,
    outFile: outFile,
    project: new Project({
      tsConfigFilePath: tsConfigFilePath
    }),
    schema: driver.createSchema()
  });
}

async function helpCmd() {}

async function main() {
  const argv = minimist(process.argv.slice(2));
  const mainCommand = argv._[0];

  switch (mainCommand) {
    case "generate":
      await generateCmd(argv);
      break;

    case "help":
    default:
      await helpCmd();
  }
}

main().catch(console.error);
