import { LockMode } from "../../../LockMode";
import { buildLockMode } from "../../../impl/driver/mysql/querybuilding/buildLockMode";

test("buildLockMode returns FOR UPDATE if mode is LockMode.ForUpdate", () => {
  expect(buildLockMode(LockMode.ForUpdate)).toBe("FOR UPDATE");
});

test("buildLockMode returns LOCK IN SHARE MODE if mode is LockMode.LockInShareMode", () => {
  expect(buildLockMode(LockMode.LockInShareMode)).toBe("LOCK IN SHARE MODE");
});
