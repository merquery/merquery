import { Row } from "../Row";
import { SelectState } from "../SelectState";
import { Table } from "../TableLike";
import { OneOrMoreArrayUtil } from "./OneOrMoreArray";
export function createSelectState<R extends Row>(
  state: Partial<SelectState<R>> = {},
  ...tables: Table<R>[]
): SelectState<R> {
  return {
    from: tables.length > 0 ? OneOrMoreArrayUtil.fromArray(tables) : undefined,
    columns: [],
    ...state
  };
}

export function createSelectStateWithRecordTable<R extends Row>(
  state: Partial<SelectState<R>>,
  recordTable: Table<R>
) {
  return {
    ...createSelectState(state, recordTable),
    from: OneOrMoreArrayUtil.just(recordTable),
    recordTable: recordTable
  };
}
