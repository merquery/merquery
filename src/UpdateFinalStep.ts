import { Row } from "./Row";
import { Query } from "./Query";

export interface UpdateFinalStep<R extends Row> extends Query<R> {
  execute(): Promise<void>;
}
