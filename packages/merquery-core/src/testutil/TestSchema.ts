import { GeneratedTableField, Table, TableFieldImpl } from "..";

export interface EventRow {
  __ROW_KIND__: "EventRow";
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  club_id: string;
}

export interface EventTable {
  ID: GeneratedTableField<EventRow, number>;
  NAME: GeneratedTableField<EventRow, string>;
  DESCRIPTION: GeneratedTableField<EventRow, string>;
  START_TIME: GeneratedTableField<EventRow, string>;
  END_TIME: GeneratedTableField<EventRow, string>;
  CLUB_ID: GeneratedTableField<EventRow, string>;
}

export const EVENT: Table<EventRow> & EventTable = {
  kind: "Table",
  fields: [
    {
      kind: "TableField",
      column: "id",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      rowKind: "EventRow",
      type: { type: "INTEGER", length: 0, signed: true, nullable: false }
    },
    {
      kind: "TableField",
      column: "name",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      rowKind: "EventRow",
      type: { type: "STRING", nullable: false }
    },
    {
      kind: "TableField",
      column: "description",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      rowKind: "EventRow",
      type: { type: "STRING", nullable: false }
    },
    {
      kind: "TableField",
      column: "start_time",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      rowKind: "EventRow",
      type: { type: "STRING", nullable: false }
    },
    {
      kind: "TableField",
      column: "end_time",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      rowKind: "EventRow",
      type: { type: "STRING", nullable: false }
    },
    {
      kind: "TableField",
      column: "club_id",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      rowKind: "EventRow",
      type: { type: "STRING", nullable: false }
    }
  ],
  name: "event",
  schema: "projectclub",
  rowKind: "EventRow",
  ID: new TableFieldImpl<EventRow, number>({
    kind: "TableField",
    column: "id",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    rowKind: "EventRow",
    type: { type: "INTEGER", length: 0, signed: true, nullable: false }
  }),
  NAME: new TableFieldImpl<EventRow, string>({
    kind: "TableField",
    column: "name",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    rowKind: "EventRow",
    type: { type: "STRING", nullable: false }
  }),
  DESCRIPTION: new TableFieldImpl<EventRow, string>({
    kind: "TableField",
    column: "description",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    rowKind: "EventRow",
    type: { type: "STRING", nullable: false }
  }),
  START_TIME: new TableFieldImpl<EventRow, string>({
    kind: "TableField",
    column: "start_time",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    rowKind: "EventRow",
    type: { type: "STRING", nullable: false }
  }),
  END_TIME: new TableFieldImpl<EventRow, string>({
    kind: "TableField",
    column: "end_time",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    rowKind: "EventRow",
    type: { type: "STRING", nullable: false }
  }),
  CLUB_ID: new TableFieldImpl<EventRow, string>({
    kind: "TableField",
    column: "club_id",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    rowKind: "EventRow",
    type: { type: "STRING", nullable: false }
  })
};

export interface UserRow {
  __ROW_KIND__: "UserRow";
  id: number;
  name: string;
}

export interface UserTable {
  ID: GeneratedTableField<UserRow, number>;
  NAME: GeneratedTableField<UserRow, string>;
}

export const USER: Table<UserRow> & UserTable = {
  kind: "Table",
  fields: [
    {
      kind: "TableField",
      column: "id",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
      rowKind: "UserRow",
      type: { type: "INTEGER", length: 0, signed: true, nullable: false }
    },
    {
      kind: "TableField",
      column: "name",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
      rowKind: "UserRow",
      type: { type: "STRING", nullable: false }
    }
  ],
  name: "user",
  schema: "projectclub",
  rowKind: "UserRow",
  ID: new TableFieldImpl<UserRow, number>({
    kind: "TableField",
    column: "id",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
    rowKind: "UserRow",
    type: { type: "INTEGER", length: 0, signed: true, nullable: false }
  }),
  NAME: new TableFieldImpl<UserRow, string>({
    kind: "TableField",
    column: "name",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
    rowKind: "UserRow",
    type: { type: "STRING", nullable: false }
  })
};

export interface UserToEventRow {
  __ROW_KIND__: "UserToEventRow";
  user_id: number;
  event_id: number;
}

export interface UserToEventTable {
  USER_ID: GeneratedTableField<UserToEventRow, number>;
  EVENT_ID: GeneratedTableField<UserToEventRow, number>;
}

export const USER_TO_EVENT: Table<UserToEventRow> & UserToEventTable = {
  kind: "Table",
  fields: [
    {
      kind: "TableField",
      column: "user_id",
      table: {
        kind: "TableFieldOwner",
        schema: "projectclub",
        table: "user_to_event"
      },
      rowKind: "UserToEventRow",
      type: { type: "INTEGER", length: 0, signed: true, nullable: false }
    },
    {
      kind: "TableField",
      column: "event_id",
      table: {
        kind: "TableFieldOwner",
        schema: "projectclub",
        table: "user_to_event"
      },
      rowKind: "UserToEventRow",
      type: { type: "INTEGER", length: 0, signed: true, nullable: false }
    }
  ],
  name: "user_to_event",
  schema: "projectclub",
  rowKind: "UserToEventRow",
  USER_ID: new TableFieldImpl<UserToEventRow, number>({
    kind: "TableField",
    column: "user_id",
    table: {
      kind: "TableFieldOwner",
      schema: "projectclub",
      table: "user_to_event"
    },
    rowKind: "UserToEventRow",
    type: { type: "INTEGER", length: 0, signed: true, nullable: false }
  }),
  EVENT_ID: new TableFieldImpl<UserToEventRow, number>({
    kind: "TableField",
    column: "event_id",
    table: {
      kind: "TableFieldOwner",
      schema: "projectclub",
      table: "user_to_event"
    },
    rowKind: "UserToEventRow",
    type: { type: "INTEGER", length: 0, signed: true, nullable: false }
  })
};
