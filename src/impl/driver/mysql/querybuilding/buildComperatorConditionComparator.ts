import { assertNever } from "../../../Util";
import { Comparator } from "../../../../Condition";

/**
 *
 * @param operator Operator of the comparison
 * @returns String representation of the comparator
 */
export function buildComperatorConditionComparator(operator: Comparator) {
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
