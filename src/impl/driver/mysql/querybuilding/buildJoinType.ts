import { JoinType } from "../../../../JoinType";
import { assertNever } from "../../../Util";

export function buildJoinType(joinType: JoinType) {
  switch (joinType) {
    case JoinType.Inner:
      return "INNER";
    case JoinType.Left:
      return "LEFT";
    case JoinType.Right:
      return "RIGHT";
    default:
      return assertNever(joinType);
  }
}
