import { SelectState } from "../../../SelectState";
import { ConditionOperator } from "../../../ConditionOperator";
import { assertNever } from "../../Util";
import { TableField, ValueField, Field } from "../../../Field";
import * as SqlString from "sqlstring";
import {
  Comperator,
  ComperatorCondition,
  Condition,
  ConditionCollection
} from "../../../Condition";
import { TableFromPart, SubQueryFromPart, FromPart } from "../../../FromPart";
import { ConditionWithOperator } from "../../../ConditionWithOperator";
import { FieldCollection } from "../../../FieldCollection";
import { OrderDirection } from "../../../OrderDirection";
import { OrderByWithDirection } from "../../../OrderByWithDirection";
import { Table, TableLikeOrTableLikeAlias } from "../../../TableLike";
import { Row } from "../../../Row";
import { SubQuery } from "../../../SubQuery";
import { FieldOwner } from "../../../FieldOwner";

function buildConditionOperatorString(condOperator: ConditionOperator) {
  switch (condOperator) {
    case ConditionOperator.And:
      return "AND";
    case ConditionOperator.Or:
      return "OR";
    default:
      assertNever(condOperator);
  }
}

export function buildGravisList(...parts: string[]) {
  return parts.map(wrapGravis).join(".");
}

function buildTableField<T>(field: TableField<any, T>) {
  return buildGravisList(
    ...[...buildFieldOwnerName(field.table), field.column]
  );
}

function buildFieldOwnerName(fieldOwner: FieldOwner): string[] {
  switch (fieldOwner.kind) {
    case "AliasFieldOwner":
      return [fieldOwner.alias];
    case "TableFieldOwner":
      return [fieldOwner.schema, fieldOwner.table];
    default:
      return assertNever(fieldOwner);
  }
}

function wrapGravis(str: string) {
  return `\`${str}\``;
}

function buildValueField<T>(field: ValueField<T>) {
  return SqlString.escape(field.value);
}

function buildField(field: Field<any>) {
  switch (field.kind) {
    case "TableField":
      return buildTableField(field);
    case "ValueField":
      return buildValueField(field);
    case "SubQueryField":
      return buildSubQuery(field.subQuery);
    default:
      assertNever(field);
  }
}

function buildComperatorConditionComparator(operator: Comperator) {
  switch (operator) {
    case "=":
      return "=";
    default:
      assertNever(operator);
  }
}

function buildComperatorCondition(condition: ComperatorCondition) {
  return `${buildField(condition.field1)} ${buildComperatorConditionComparator(
    condition.comperator
  )} ${buildField(condition.field2)}`;
}

function buildSubCondition(condition: Condition) {
  switch (condition.kind) {
    case "ComperatorCondition":
      return buildComperatorCondition(condition);

    case "ConditionCollection":
      return `(${buildConditions(condition)})`;

    default:
      assertNever(condition);
  }
}

function buildTopLevelCondition(condition: ConditionCollection) {
  return buildConditions(condition);
}

function buildTable<R extends Row>(table: Table<R>) {
  return buildGravisList(table.schema, table.name);
}

function buildTableFromPart(fromPart: TableFromPart<any>) {
  return buildTable(fromPart.table);
}

function buildTableAllColumns<R extends Row>(table: Table<R>) {
  return `${buildTable(table)}.*`;
}

function buildSubQuery<R extends Row>(subQuery: SubQuery<R>) {
  return `(${buildMysqlSelectQuery(subQuery.state)})`;
}

function buildFromPart(tableLike: TableLikeOrTableLikeAlias<any>): string {
  switch (tableLike.kind) {
    case "Table":
      return buildTable(tableLike);
    case "TableLikeAlias":
      return `${buildFromPart(tableLike.table)} AS ${buildGravisList(
        tableLike.alias
      )}`;
    case "SubQueryTable":
      return buildSubQuery(tableLike.query);
    default:
      return assertNever(tableLike);
  }
}

function buildFromPartList(tables: TableLikeOrTableLikeAlias<any>[]) {
  return tables.map(buildFromPart).join(", ");
}

function buildConditions(c: ConditionCollection) {
  const conditions = c.conditions;
  if (conditions.length === 0) throw new Error("Need atleast one condition");

  return conditions
    .reduce((str, condition, i) => {
      let conditionStr = ``;

      if (i > 0) {
        conditionStr += ` ${buildConditionOperatorString(condition.operator)}`;
      }
      conditionStr += ` ${buildSubCondition(condition.condition)}`;

      return str + conditionStr;
    }, "")
    .trim();
}

function buildFieldCollection(fieldCollection: FieldCollection) {
  return fieldCollection.fields.map(buildField).join(", ");
}

function buildDirection(direction: OrderDirection) {
  switch (direction) {
    case OrderDirection.Ascending:
      return "ASC";
    case OrderDirection.Descending:
      return "DESC";
    default:
      assertNever(direction);
  }
}

function buildOrderByWithDirection(orderByWithDirection: OrderByWithDirection) {
  return `${buildField(orderByWithDirection.field)} ${buildDirection(
    orderByWithDirection.direction
  )}`;
}

function buildOrderByCollection(orderBy: OrderByWithDirection[]) {
  return orderBy.map(buildOrderByWithDirection).join(", ");
}

export function buildMysqlSelectQuery(state: SelectState<any>): string {
  let query: string = "";

  query += `SELECT`;

  if (state.recordTable || state.columns.length === 0) {
    query += ` *`;
  } else if (state.columns.length > 0) {
    query += ` ${buildFieldCollection({ fields: state.columns })}`;
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
    query += ` GROUP BY ${buildFieldCollection(state.groupBy)}`;
  }

  if (state.orderBy.length > 0) {
    query += ` ORDER BY ${buildOrderByCollection(state.orderBy)}`;
  }

  if (typeof state.limit !== "undefined") {
    query += ` LIMIT ${state.limit}`;

    if (typeof state.offset !== "undefined") {
      query += ` OFFSET ${state.offset}`;
    }
  }

  return query;
}

//export function buildMysqlSelectQuery(selectState: SelectState) {}
