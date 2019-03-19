import { Row } from "./Row";
import { SubQuery } from "./SubQuery";
export interface SubQueryField<R extends Row> {
  kind: "SubQueryField";
  subQuery: SubQuery<R>;
}
