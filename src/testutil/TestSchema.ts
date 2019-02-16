import { TableField } from "../Field";
import { Row } from "../Row";
import { Table } from "../TableLike";
export interface EventRow extends Row {
  __ROW_KIND__: "EventRow";
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  club_id: string;
}

export interface EventTable {
  ID: TableField<EventRow, number>;
  NAME: TableField<EventRow, string>;
  DESCRIPTION: TableField<EventRow, string>;
  START_TIME: TableField<EventRow, string>;
  END_TIME: TableField<EventRow, string>;
  CLUB_ID: TableField<EventRow, string>;
}

export const EVENT: Table<EventRow> & EventTable = {
  kind: "Table",
  name: "event",
  fields: [
    {
      kind: "TableField",
      column: "id",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      type: { type: "INTEGER", length: 0, signed: true },
      rowKind: "EventRow"
    },
    {
      kind: "TableField",
      column: "name",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      type: { type: "STRING" },
      rowKind: "EventRow"
    },
    {
      kind: "TableField",
      column: "description",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      type: { type: "STRING" },
      rowKind: "EventRow"
    },
    {
      kind: "TableField",
      column: "start_time",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      type: { type: "STRING" },
      rowKind: "EventRow"
    },
    {
      kind: "TableField",
      column: "end_time",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      type: { type: "STRING" },
      rowKind: "EventRow"
    },
    {
      kind: "TableField",
      column: "club_id",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
      type: { type: "STRING" },
      rowKind: "EventRow"
    }
  ],
  schema: "projectclub",
  rowKind: "EventRow",
  ID: {
    kind: "TableField",
    column: "id",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    type: { type: "INTEGER", length: 0, signed: true },
    rowKind: "EventRow"
  },
  NAME: {
    kind: "TableField",
    column: "name",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    type: { type: "STRING" },
    rowKind: "EventRow"
  },
  DESCRIPTION: {
    kind: "TableField",
    column: "description",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    type: { type: "STRING" },
    rowKind: "EventRow"
  },
  START_TIME: {
    kind: "TableField",
    column: "start_time",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    type: { type: "STRING" },
    rowKind: "EventRow"
  },
  END_TIME: {
    kind: "TableField",
    column: "end_time",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    type: { type: "STRING" },
    rowKind: "EventRow"
  },
  CLUB_ID: {
    kind: "TableField",
    column: "club_id",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "event" },
    type: { type: "STRING" },
    rowKind: "EventRow"
  }
};
export interface UserRow extends Row {
  __ROW_KIND__: "UserRow";
  id: number;
  name: string;
}

export interface UserTable {
  ID: TableField<UserRow, number>;
  NAME: TableField<UserRow, string>;
}

export const USER: Table<UserRow> & UserTable = {
  kind: "Table",
  name: "user",
  fields: [
    {
      kind: "TableField",
      column: "id",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
      type: { type: "INTEGER", length: 0, signed: true },
      rowKind: "UserRow"
    },
    {
      kind: "TableField",
      column: "name",
      table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
      type: { type: "STRING" },
      rowKind: "UserRow"
    }
  ],
  schema: "projectclub",
  rowKind: "UserRow",
  ID: {
    kind: "TableField",
    column: "id",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
    type: { type: "INTEGER", length: 0, signed: true },
    rowKind: "UserRow"
  },
  NAME: {
    kind: "TableField",
    column: "name",
    table: { kind: "TableFieldOwner", schema: "projectclub", table: "user" },
    type: { type: "STRING" },
    rowKind: "UserRow"
  }
};
export interface UserToEventRow extends Row {
  __ROW_KIND__: "UserToEventRow";
  user_id: number;
  event_id: number;
}

export interface UserToEventTable {
  USER_ID: TableField<UserToEventRow, number>;
  EVENT_ID: TableField<UserToEventRow, number>;
}

export const USER_TO_EVENT: Table<UserToEventRow> & UserToEventTable = {
  kind: "Table",
  name: "user_to_event",
  fields: [
    {
      kind: "TableField",
      column: "user_id",
      table: {
        kind: "TableFieldOwner",
        schema: "projectclub",
        table: "user_to_event"
      },
      type: { type: "INTEGER", length: 0, signed: true },
      rowKind: "UserToEventRow"
    },
    {
      kind: "TableField",
      column: "event_id",
      table: {
        kind: "TableFieldOwner",
        schema: "projectclub",
        table: "user_to_event"
      },
      type: { type: "INTEGER", length: 0, signed: true },
      rowKind: "UserToEventRow"
    }
  ],
  schema: "projectclub",
  rowKind: "UserToEventRow",
  USER_ID: {
    kind: "TableField",
    column: "user_id",
    table: {
      kind: "TableFieldOwner",
      schema: "projectclub",
      table: "user_to_event"
    },
    type: { type: "INTEGER", length: 0, signed: true },
    rowKind: "UserToEventRow"
  },
  EVENT_ID: {
    kind: "TableField",
    column: "event_id",
    table: {
      kind: "TableFieldOwner",
      schema: "projectclub",
      table: "user_to_event"
    },
    type: { type: "INTEGER", length: 0, signed: true },
    rowKind: "UserToEventRow"
  }
};
