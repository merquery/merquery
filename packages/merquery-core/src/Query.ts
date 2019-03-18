import { Row } from "./Row";
export interface Query<R extends Row> {
  /**
   * SQL String representation of the query
   * @returns SQL String representation
   */
  asSqlString(): string;
}
