import { SelectState } from "../../../../SelectState";
import { TableField, ValueField, Field } from "../../../../Field";
import * as SqlString from "sqlstring";
import { buildTopLevelCondition } from "./buildTopLevelCondition";
import { buildFromPartList } from "./buildFromPartList";
import { buildFieldCollection } from "./buildFieldCollection";
import { buildOrderByCollection } from "./buildOrderByCollection";

export function buildMysqlSelectQuery(state: SelectState<any>): string {
  let query: string = "";

  query += `SELECT`;

  if (state.recordTable || state.columns.length === 0) {
    query += ` *`;
  } else if (state.columns.length > 0) {
    query += ` ${buildFieldCollection(state.columns)}`;
  } else {
    throw new Error("Invalid columns");
  }

  if (state.from.length > 0) {
    query += ` FROM ${buildFromPartList(state.from)}`;
  }

  if (state.condition && state.condition.conditions.length > 0) {
    query += ` WHERE ${buildTopLevelCondition(state.condition)}`;
  }

  if (typeof state.groupBy !== "undefined" && state.groupBy.fields.length > 0) {
    query += ` GROUP BY ${buildFieldCollection(state.groupBy.fields)}`;
  }

  if (state.orderBy.length > 0) {
    query += ` ORDER BY ${buildOrderByCollection(state.orderBy)}`;
  }

  if (typeof state.limit !== "undefined") {
    query += ` LIMIT ${SqlString.escape(state.limit)}`;

    if (typeof state.offset !== "undefined") {
      query += ` OFFSET ${SqlString.escape(state.offset)}`;
    }
  }

  return query;
}
