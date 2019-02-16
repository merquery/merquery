import { Schema, SchemaTable } from "../../../Schema";
import { MysqlDriver } from "./MysqlDriver";
import { TableColumn } from "./MysqlQueryRunner";
import {
  DataTypeProps,
  DataTypeStringProps,
  DataTypeIntegerProps
} from "../../../DataType";

const STRING_TYPE: DataTypeStringProps = {
  type: "STRING"
};

export class MysqlSchema implements Schema {
  constructor(private driver: MysqlDriver, private schemaName: string) {}

  getIntType(length: number, signed: boolean): DataTypeIntegerProps {
    return {
      type: "INTEGER",
      length: length,
      signed: signed
    };
  }

  getStringType() {
    return STRING_TYPE;
  }

  getTypeFromColumn(tableColumn: TableColumn): DataTypeProps {
    const typeIdentifier = tableColumn.Type.split("(")[0].toUpperCase();

    switch (typeIdentifier) {
      case "VARCHAR":
      case "TEXT":
      case "DATE":
        return this.getStringType();
      case "INT":
      case "BIGINT":
        return this.getIntType(0, true);
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

    return schemaTables;
  }
}
