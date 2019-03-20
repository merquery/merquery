import { TableField } from "./TableField";
import { ValueField } from "./ValueField";
import { SubQueryField } from "./SubQueryField";
import { TableValueField } from "./TableValueField";
export type Field<T> =
  | TableField<any, T>
  | ValueField<T>
  | SubQueryField<any>
  | TableValueField<any, T>;
