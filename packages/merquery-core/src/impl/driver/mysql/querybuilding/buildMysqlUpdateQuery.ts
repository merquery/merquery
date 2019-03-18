import { Row } from "../../../../Row";
import { UpdateState } from "../../../../UpdateState";
import { buildTableLike } from "./buildTableLike";
import { buildSetList } from "./buildSetList";
import { buildConditions } from "./buildConditions";
import { OneOrMoreArrayUtil } from "../../../OneOrMoreArray";

export function buildMysqlUpdateQuery<R extends Row>(
  state: UpdateState<R>
): string {
  let query = `UPDATE ${buildTableLike(state.table)}`;

  query += ` SET ${buildSetList(OneOrMoreArrayUtil.fromArray(state.updates))}`;

  if (state.condition) {
    query += ` WHERE ${buildConditions(state.condition)}`;
  }

  return query;
}
