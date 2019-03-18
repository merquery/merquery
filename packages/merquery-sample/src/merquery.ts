import { GeneratedTableField, Table, TableFieldImpl } from "merquery-core";

export interface UserRow {
  __ROW_KIND__: "UserRow";
  id: string;
  username: string;
  last_login: number | null;
  account_status: "FREE" | "PREMIUM" | "PREMIUMPLUS";
  status: string | null;
}

export interface UserTable {
  ID: GeneratedTableField<UserRow, string>;
  USERNAME: GeneratedTableField<UserRow, string>;
  LAST_LOGIN: GeneratedTableField<UserRow, number | null>;
  ACCOUNT_STATUS: GeneratedTableField<
    UserRow,
    "FREE" | "PREMIUM" | "PREMIUMPLUS"
  >;
  STATUS: GeneratedTableField<UserRow, string | null>;
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
      type: { type: "STRING", nullable: false }
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
      type: { type: "STRING", nullable: false }
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
      type: { type: "INTEGER", length: 0, signed: true, nullable: true }
    },
    {
      kind: "TableField",
      column: "account_status",
      table: {
        kind: "TableFieldOwner",
        schema: "merquerysample",
        table: "user"
      },
      rowKind: "UserRow",
      type: {
        nullable: false,
        options: ["FREE", "PREMIUM", "PREMIUMPLUS"],
        type: "ENUM"
      }
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
      type: { type: "STRING", nullable: true }
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
    type: { type: "STRING", nullable: false }
  }),
  USERNAME: new TableFieldImpl<UserRow, string>({
    kind: "TableField",
    column: "username",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: { type: "STRING", nullable: false }
  }),
  LAST_LOGIN: new TableFieldImpl<UserRow, number>({
    kind: "TableField",
    column: "last_login",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: { type: "INTEGER", length: 0, signed: true, nullable: true }
  }),
  ACCOUNT_STATUS: new TableFieldImpl<
    UserRow,
    "FREE" | "PREMIUM" | "PREMIUMPLUS"
  >({
    kind: "TableField",
    column: "account_status",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: {
      nullable: false,
      options: ["FREE", "PREMIUM", "PREMIUMPLUS"],
      type: "ENUM"
    }
  }),
  STATUS: new TableFieldImpl<UserRow, string>({
    kind: "TableField",
    column: "status",
    table: { kind: "TableFieldOwner", schema: "merquerysample", table: "user" },
    rowKind: "UserRow",
    type: { type: "STRING", nullable: true }
  })
};
