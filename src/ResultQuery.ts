import { Row } from "./Row";
import { Query } from "./Query";
import { ResultRow } from "./QueryResult";
export interface ResultQuery<R extends Row> extends Query<R> {
  /**
   * Fetches all rows.
   *
   * @returns A promise which eventually returns an array of the typed rows.
   */
  fetchAll(): Promise<R[]>;

  /**
   * Fetches one row.
   *
   * @returns A promise which eventually returns an array of the typed row.
   */
  fetchOne(): Promise<R | undefined>;

  /**
   * Fetches all rows and maps via the supplied mapper function.
   * @param mapper
   * @returns A promise which eventually returns an array, after it has been mapped
   */
  fetchAllMapped<M>(mapper: (row: ResultRow) => M): Promise<M[]>;
}
