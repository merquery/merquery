import { LockMode } from "../../../../LockMode";
import { assertNever } from "../../../Util";

export function buildLockMode(lockMode: LockMode) {
  switch (lockMode) {
    case LockMode.ForUpdate:
      return "FOR UPDATE";
    case LockMode.LockInShareMode:
      return "LOCK IN SHARE MODE";
    default:
      return assertNever(lockMode);
  }
}
