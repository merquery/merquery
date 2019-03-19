import { Field } from "./Field";
import { OrderDirection } from "./OrderDirection";
export interface OrderByWithDirection {
  field: Field<any>;
  direction: OrderDirection;
}
