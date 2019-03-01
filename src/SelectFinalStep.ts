import { Row } from "./Row";
import { SelectState } from "./SelectState";
import { ResultQuery } from "./ResultQuery";
import { SubQuery } from "./SubQuery";

export interface SelectFinalStep<R extends Row> extends ResultQuery<R> {
  asSubQuery(): SubQuery<R>;
}
