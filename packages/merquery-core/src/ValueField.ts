import { TableField } from "./TableField";

export interface ValueField<T> {
  kind: "ValueField";
  value: T;
}
