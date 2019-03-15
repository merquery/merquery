import { OrderByWithDirection } from "../../../../OrderByWithDirection";
import { buildField } from "./buildField";
import { buildDirection } from "./buildDirection";
export function buildOrderByWithDirection(
  orderByWithDirection: OrderByWithDirection
) {
  return `${buildField(orderByWithDirection.field)} ${buildDirection(
    orderByWithDirection.direction
  )}`;
}
