import { assertNever } from "../../../Util";
import { Comperator } from "../../../../Condition";

/**
 *
 * @param operator Operator of the comparison
 * @returns String representation of the comparator
 */
export function buildComperatorConditionComparator(operator: Comperator) {
  switch (operator) {
    case "=":
      return "=";
    case "<=":
      return "<=";
    case ">=":
      return ">=";
    default:
      return assertNever(operator);
  }
}
