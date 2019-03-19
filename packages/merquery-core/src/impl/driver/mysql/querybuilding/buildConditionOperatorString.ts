import { ConditionOperator } from "../../../../ConditionOperator";
import { assertNever } from "../../../Util";
export function buildConditionOperatorString(condOperator: ConditionOperator) {
  switch (condOperator) {
    case ConditionOperator.And:
      return "AND";
    case ConditionOperator.Or:
      return "OR";
    default:
      assertNever(condOperator);
  }
}
