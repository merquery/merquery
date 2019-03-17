import { Row } from "./Row";

export interface DeleteFinalStep<R extends Row> {
  execute(): Promise<void>;
}
