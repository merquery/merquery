import { Schema } from "../../../Schema";
import { SchemaTable } from "../../../SchemaTable";
import { MysqlDriver } from "./MysqlDriver";
import { TableColumn } from "./MysqlQueryRunner";
import { DataTypeProps } from "../../../DataTypeProps";
import { DataTypeStringProps } from "../../../DataTypeStringProps";
import { DataTypeEnumProps } from "../../../DataTypeEnumProps";
import { DataTypeIntegerProps } from "../../../DataTypeIntegerProps";
import { DataTypeDateProps } from "../../../DataTypeDateProps";

export class MysqlSchema implements Schema {
  constructor(private driver: MysqlDriver, private schemaName: string) {}

  getIntType(
    length: number,
    signed: boolean,
    nullable: boolean
  ): DataTypeIntegerProps {
    return {
      type: "INTEGER",
      length: length,
      signed: signed,
      nullable: nullable
    };
  }

  getStringType(nullable: boolean): DataTypeStringProps {
    return {
      type: "STRING",
      nullable: nullable
    };
  }

  getEnumType(
    betweenParenths: string,
    nullable: boolean
  ): DataTypeEnumProps<string> {
    return {
      nullable: nullable,
      options: betweenParenths.split(",").map(str => str.slice(1, -1)),
      type: "ENUM"
    };
  }

  getDateType(nullable: boolean): DataTypeDateProps {
    return {
      nullable: nullable,
      type: "DATE"
    };
  }

  getTypeFromColumn(tableColumn: TableColumn): DataTypeProps {
    const typeIdentifier = tableColumn.Type.split("(")[0].toUpperCase();
    const betweenParenths = tableColumn.Type.substring(
      tableColumn.Type.lastIndexOf("(") + 1,
      tableColumn.Type.lastIndexOf(")")
    );

    const nullable = tableColumn.Null === "YES";

    switch (typeIdentifier) {
      case "VARCHAR":
      case "TEXT":
      case "DATE":
        return this.getStringType(nullable);
      case "INT":
      case "BIGINT":
        return this.getIntType(0, true, nullable);
      case "ENUM":
        return this.getEnumType(betweenParenths, nullable);
      case "DATE":
      case "DATETIME":
      case "TIMESTAMP":
        return this.getDateType(nullable);
    }

    throw new Error(`Unsupported data type ${typeIdentifier}`);
  }

  async fetchTables(): Promise<SchemaTable[]> {
    const queryRunner = await this.driver.createQueryRunner();

    const tables = await queryRunner.fetchTableDefinitions(this.schemaName);

    const schemaTables: SchemaTable[] = [];

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const schema: string = table["TABLE_SCHEMA"];
      const name: string = table["TABLE_NAME"];

      const columns = await queryRunner.fetchTableColumns(schema, name);

      const schemaTable: SchemaTable = {
        schema: schema,
        name: name,
        columns: columns.map(col => ({
          name: col.Field,
          type: this.getTypeFromColumn(col),
          length: 0,
          table: name,
          schema: schema
        }))
      };

      schemaTables.push(schemaTable);
    }

    queryRunner.release();

    return schemaTables;
  }
}
