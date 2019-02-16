import { Schema, SchemaTable, SchemaColumn } from "../Schema";
import { Table, aliasTable } from "../TableLike";
import { TableField } from "../Field";
import { DataTypeProps } from "../DataType";
import { EVENT, USER, UserRow } from "../testutil/TestSchema";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function snakeCaseToCamelCase(table: SchemaTable): string {
  return table.name
    .split("_")
    .map(capitalize)
    .join("");
}

export function tsTypeFromColumnType(columnType: DataTypeProps): string {
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

export function generateTableInterface(table: SchemaTable): string {
  return `export interface ${getTableInterfaceName(table)} {
${table.columns
  .map(
    c =>
      `    ${c.name.toUpperCase()}: TableField<${getRowInterfaceName(
        table
      )}, ${tsTypeFromColumnType(c.type)}>;`
  )
  .join("\n")}
}`;
}

export function getRowInterfaceName(table: SchemaTable) {
  return `${snakeCaseToCamelCase(table)}Row`;
}

export function getTableInterfaceName(table: SchemaTable) {
  return `${snakeCaseToCamelCase(table)}Table`;
}

export function generateRowInterface(table: SchemaTable): string {
  return `export interface ${getRowInterfaceName(table)} extends Row {
    __ROW_KIND__: "${getRowInterfaceName(table)}"
${table.columns
  .map(c => `    ${c.name}: ${tsTypeFromColumnType(c.type)};`)
  .join("\n")}
}`;
}

export function generateTable(table: SchemaTable): string {
  const rowInterface = generateRowInterface(table);
  const tableInterface = generateTableInterface(table);

  const createTableField = (column: SchemaColumn): TableField<any, any> => ({
    kind: "TableField",
    column: column.name,
    table: {
      kind: "TableFieldOwner",
      schema: table.schema,
      table: table.name
    },
    type: column.type,
    rowKind: getRowInterfaceName(table)
  });

  const obj: any = {
    kind: "Table",
    name: table.name,
    fields: table.columns.map(createTableField),
    schema: table.schema,
    rowKind: getRowInterfaceName(table)
  };

  table.columns.forEach(column => {
    console.log("Column type " + column.type);

    obj[column.name.toUpperCase()] = createTableField(column);
  });

  const def = `export const ${table.name.toUpperCase()}: Table<${getRowInterfaceName(
    table
  )}> & ${getTableInterfaceName(table)} = ${JSON.stringify(obj)};`;

  return [rowInterface, tableInterface, def].join("\n\n");
}

export async function generate(schema: Schema): Promise<string> {
  const tables = await schema.fetchTables();
  const tableInterfaces = tables.map(generateTable).join("\n");

  return tableInterfaces;
}
