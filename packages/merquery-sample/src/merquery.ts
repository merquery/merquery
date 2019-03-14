import { GeneratedTableField, Table, TableFieldImpl } from "merquery-core";

export interface UserRow {
  __ROW_KIND__: "UserRow";
  id: string;
  username: string;
  last_login: number;
  status: string;
}

export interface UserTable {
  ID: GeneratedTableField<UserRow, string>;
  USERNAME: GeneratedTableField<UserRow, string>;
  LAST_LOGIN: GeneratedTableField<UserRow, number>;
  STATUS: GeneratedTableField<UserRow, string>;
}

export const USER: Table<UserRow> & UserTable = {
  kind: "Table",
  fields: [
    {
      kind: "TableField",
      column: "id",
      table: {
        kind: "TableFieldOwner",
        schema: "merquerysample",
        table: "user"
      },
      rowKind: "UserRow",
      type: { type: "STRING" }
    },
    {
      kind: "TableField",
      column: "username",
      table: {
        kind: "TableFieldOwner",
        schema: "merquerysample",
        table: "user"
      },
      rowKind: "UserRow",
      type: { type: "STRING" }
    },
    {
      kind: "TableField",
      column: "last_login",
      table: {
        kind: "TableFieldOwner",
        schema: "merquerysample",
        table: "user"
      },
      rowKind: "UserRow",
      type: { type: "INTEGER", length: 0, signed: true }
    },
    {
      kind: "TableField",
      column: "status",
      table: {
        kind: "TableFieldOwner",
        schema: "merquerysample",
        table: "user"
      },
      rowKind: "UserRow",
      type: { type: "STRING" }
    }
  ],
  name: "user",
  schema: "merquerysample",
  rowKind: "UserRow",
  ID: new TableFieldImpl<UserRow, string>({
    kind: "TableField",
    column: "id",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: { type: "STRING" }
  }),
  USERNAME: new TableFieldImpl<UserRow, string>({
    kind: "TableField",
    column: "username",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: { type: "STRING" }
  }),
  LAST_LOGIN: new TableFieldImpl<UserRow, number>({
    kind: "TableField",
    column: "last_login",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: { type: "INTEGER", length: 0, signed: true }
  }),
  STATUS: new TableFieldImpl<UserRow, string>({
    kind: "TableField",
    column: "status",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: { type: "STRING" }
  })
};
