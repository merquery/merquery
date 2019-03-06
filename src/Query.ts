import { Row } from "./Row";
export interface Query<R extends Row> {
  /**
   * SQL String representation of the ResultQuery
   * @returns SQL String representation
   */
  asSqlString(): string;
}
