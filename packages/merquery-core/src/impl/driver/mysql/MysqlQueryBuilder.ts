import { QueryBuilder } from "../../../QueryBuilder";
import { SelectState } from "../../../SelectState";
import { InsertState } from "../../../InsertState";
import { UpdateState } from "../../../UpdateState";
import { DeleteState } from "../../../DeleteState";
import { buildMysqlSelectQuery } from "./querybuilding/buildMysqlSelectQuery";
import { buildMysqlInsertQuery } from "./querybuilding/buildMysqlInsertQuery";
import { buildMysqlUpdateQuery } from "./querybuilding/buildMysqlUpdateQuery";
import { buildMysqlDeleteQuery } from "./querybuilding/buildMysqlDeleteQuery";

export class MysqlQueryBuilder implements QueryBuilder {
  representSelectStateAsSqlString(state: SelectState<any>): string {
    return buildMysqlSelectQuery(state);
  }

  representInsertStateAsSqlString(state: InsertState<any>): string {
    return buildMysqlInsertQuery(state);
  }

  representUpdateStateAsSqlString(state: UpdateState<any>): string {
    return buildMysqlUpdateQuery(state);
  }

  representDeleteStateAsSqlString(state: DeleteState<any>): string {
    return buildMysqlDeleteQuery(state);
  }
}
