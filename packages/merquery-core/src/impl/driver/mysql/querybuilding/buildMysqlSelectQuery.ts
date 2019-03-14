import { SelectState } from "../../../../SelectState";
import { TableField, ValueField, Field } from "../../../../Field";
import * as SqlString from "sqlstring";
import { buildFromPartList } from "./buildFromPartList";
import { buildFieldCollection } from "./buildFieldCollection";
import { buildOrderByCollection } from "./buildOrderByCollection";
import { buildJoinedTableWithOnCondition } from "./buildJoinedTableWithOnCondition";
import { buildCondition } from "./buildCondition";
import { buildHavingCondition } from "./buildHavingCondition";
import { buildLockMode } from "./buildLockMode";
import { buildConditions } from "./buildConditions";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export function buildMysqlSelectQuery(state: SelectState<any>): string {
  let query: string = "";

  query += `SELECT`;

  if (state.recordTable || state.columns.length === 0) {
    query += ` *`;
  } else {
    query += ` ${buildFieldCollection(state.columns)}`;
  }

  if (state.from) {
    query += ` FROM ${buildFromPartList(
      OneOrMoreArrayUtil.toArray(state.from)
    )}`;
  }

  if (state.joins) {
    query += ` ${OneOrMoreArrayUtil.toArray(state.joins)
      .map(buildJoinedTableWithOnCondition)
      .join(" ")}`;
  }

  if (state.condition) {
    query += ` WHERE ${buildConditions(state.condition)}`;
  }

  if (state.groupBy) {
    query += ` GROUP BY ${buildFieldCollection(
      OneOrMoreArrayUtil.toArray(state.groupBy)
    )}`;
  }

  if (state.having) {
    query += ` HAVING ${buildHavingCondition(state.having)}`;
  }

  if (state.orderBy) {
    query += ` ORDER BY ${buildOrderByCollection(
      OneOrMoreArrayUtil.toArray(state.orderBy)
    )}`;
  }

  if (typeof state.limit !== "undefined") {
    query += ` LIMIT ${SqlString.escape(state.limit)}`;

    if (typeof state.offset !== "undefined") {
      query += ` OFFSET ${SqlString.escape(state.offset)}`;
    }
  }

  if (typeof state.lockMode !== "undefined") {
    query += ` ${buildLockMode(state.lockMode)}`;
  }

  return query;
}
