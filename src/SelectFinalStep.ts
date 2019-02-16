import { Row } from "./Row";
import { SelectState } from "./SelectState";
import { ResultQuery } from "./ResultQuery";

export interface SelectFinalStep<R extends Row> extends ResultQuery<R> {}
