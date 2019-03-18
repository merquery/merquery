import { Driver } from "../../Driver";
import { Project, VariableDeclarationKind } from "ts-morph";
import { MysqlDriver } from "../driver/mysql/MysqlDriver";
import { DataTypeProps } from "../../DataTypeProps";
import { TableField } from "../../TableField";
import { Table } from "../../TableLike";
import { Schema } from "../../Schema";

export function capitalize(str: string) {
  if (str.length < 1) return str;

  return str[0].toUpperCase() + str.slice(1);
}

export function snakeCaseToCamelCase(str: string) {
  return str
    .split("_")
    .map(capitalize)
    .join("");
}

function primaryTsTypeFromColumnType(columnType: DataTypeProps): string {
  switch (columnType.type) {
    case "INTEGER":
      return "number";
    case "STRING":
      return "string";
    case "ENUM":
      return columnType.options.map(option => `"${option}"`).join(" | ");
  }

  return "any";
}

export function tsTypeFromColumnType(columnType: DataTypeProps): string {
  const primary = primaryTsTypeFromColumnType(columnType);

  return columnType.nullable ? `${primary} | null` : primary;
}

export interface GenerateConfig {
  schema: Schema;
  merqueryModule: string;
  project: Project;
  outFile: string;
}

export async function generate({
  schema,
  merqueryModule,
  project,
  outFile
}: GenerateConfig) {
  const tables = await schema.fetchTables();

  const existingFile = project.getSourceFile(outFile);

  if (existingFile) {
    await existingFile.deleteImmediately();
  }

  const file = await project.createSourceFile(outFile);

  file.addImportDeclaration({
    moduleSpecifier: merqueryModule,
    namedImports: ["GeneratedTableField", "Table", "TableFieldImpl"]
  });

  tables.forEach(table => {
    const baseName = snakeCaseToCamelCase(table.name);

    const tableName = baseName + "Table";
    const rowKind = baseName + "Row";

    const rowInterface = file.addInterface({
      isExported: true,
      name: rowKind
    });

    const tableInterface = file.addInterface({
      isExported: true,
      name: tableName
    });

    let fields: TableField<any, any>[] = [];

    rowInterface.addProperty({
      name: "__ROW_KIND__",
      type: `"${rowKind}"`
    });

    table.columns.forEach(column => {
      const columnType = tsTypeFromColumnType(column.type);

      rowInterface.addProperty({
        name: column.name,
        type: columnType
      });

      tableInterface.addProperty({
        name: column.name.toUpperCase(),
        type: `GeneratedTableField<${rowKind}, ${columnType}>`
      });

      const tableField: TableField<any, any> = {
        kind: "TableField",
        column: column.name,
        table: {
          kind: "TableFieldOwner",
          schema: column.schema,
          table: column.table
        },
        rowKind: rowKind,
        type: column.type
      };

      fields.push(tableField);
    });

    const tableDef: Table<any> = {
      kind: "Table",
      fields: fields,
      name: table.name,
      schema: table.schema,
      rowKind: rowKind
    };

    let tableDefString = JSON.stringify(tableDef);
    tableDefString = tableDefString.slice(0, -1);
    tableDefString += ",";
    fields.forEach(field => {
      tableDefString += `${JSON.stringify(
        field.column.toUpperCase()
      )}: new TableFieldImpl<${rowKind}, ${primaryTsTypeFromColumnType(
        field.type
      )}>(${JSON.stringify(field)}),`;
    });

    tableDefString = tableDefString.slice(0, -1);
    tableDefString += "}";

    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: table.name.toUpperCase(),
          type: `Table<${rowKind}> & ${tableName}`,
          initializer: tableDefString
        }
      ]
    });
  });

  await project.save();
}
