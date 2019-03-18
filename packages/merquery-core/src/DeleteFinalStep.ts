import { Row } from "./Row";
import { Query } from "./Query";

export interface DeleteFinalStep<R extends Row> extends Query<R> {
  execute(): Promise<void>;
}
