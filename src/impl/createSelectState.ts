import { Row } from "../Row";
import { SelectState } from "../SelectState";
import { Table } from "../TableLike";
export function createSelectState<R extends Row>(
  state: Partial<SelectState<R>> = {}
): SelectState<R> {
  return {
    columns: [],
    from: [],
    joins: [],
    orderBy: [],
    groupBy: [],
    ...state
  };
}

export function createSelectStateWithRecordTable<R extends Row>(
  state: Partial<SelectState<R>>,
  recordTable: Table<R>
) {
  return {
    ...createSelectState(state),
    from: [recordTable],
    recordTable: recordTable
  };
}
