import { Row } from "./Row";
import { SubQuery } from "./SubQuery";
export interface Query<R extends Row> {
  asSubQuery(): SubQuery<R>;
}
