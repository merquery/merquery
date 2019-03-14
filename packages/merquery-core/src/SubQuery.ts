import { Row } from "./Row";
import { SelectState } from "./SelectState";
export interface SubQuery<R extends Row> {
  state: SelectState<R>;
}
