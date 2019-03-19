import { TableField } from "./TableField";
import { ValueField } from "./ValueField";
import { SubQueryField } from "./SubQueryField";
export type Field<T> = TableField<any, T> | ValueField<T> | SubQueryField<any>;
