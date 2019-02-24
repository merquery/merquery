import { SubQuery } from "../../../../SubQuery";
import { Row } from "../../../../Row";
import { buildMysqlSelectQuery } from "./buildMysqlSelectQuery";

export function buildSubQuery<R extends Row>(subQuery: SubQuery<R>) {
  return `(${buildMysqlSelectQuery(subQuery.state)})`;
}
