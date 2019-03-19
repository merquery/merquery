import { assertNever } from "../../../Util";
import { OrderDirection } from "../../../../OrderDirection";
export function buildDirection(direction: OrderDirection) {
  switch (direction) {
    case OrderDirection.Ascending:
      return "ASC";
    case OrderDirection.Descending:
      return "DESC";
    default:
      assertNever(direction);
  }
}
