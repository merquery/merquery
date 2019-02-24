import { OrderByWithDirection } from "../../../../OrderByWithDirection";
import { buildOrderByWithDirection } from "./buildOrderByWithDirection";
export function buildOrderByCollection(orderBy: OrderByWithDirection[]) {
  return orderBy.map(buildOrderByWithDirection).join(", ");
}
