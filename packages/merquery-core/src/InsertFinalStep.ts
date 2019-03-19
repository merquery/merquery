import { Row } from "./Row";
import { Query } from "./Query";

export interface InsertFinalStep<R extends Row> extends Query<R> {
  execute(): Promise<void>;
}
