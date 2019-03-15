import { Row } from "./Row";
import { DataTypeProps } from "./DataType";
import { SubQuery } from "./SubQuery";
import { TableLikeAlias, TableLikeOrTableLikeAlias } from "./TableLike";
import { FieldOwner } from "./FieldOwner";

export interface TableField<R extends Row, T> {
  kind: "TableField";
  table: FieldOwner;
  column: string;
  type: DataTypeProps;
  rowKind: R["__ROW_KIND__"];
}

export interface ValueField<T> {
  kind: "ValueField";
  value: T;
}

export interface SubQueryField<R extends Row> {
  kind: "SubQueryField";
  subQuery: SubQuery<R>;
}

export interface FieldAlias<T> {
  kind: "FieldAlias";
  alias: string;
  field: Field<T>;
}

export type Field<T> = TableField<any, T> | ValueField<T> | SubQueryField<any>;
export type FieldOrFieldAlias<T> = Field<T> | FieldAlias<T>;

/**
 * Transforms a value to a field representation of the value.
 * Throws an exception if the value is undefined.
 *
 * @param v Value to wrap
 */
export function val<T>(v: T): ValueField<T> {
  if (typeof v === "undefined")
    throw new Error("Undefined is not allowed as value");
  if (v === null) throw new Error("Undefined is not allowed as value");

  return {
    kind: "ValueField",
    value: v
  };
}

/**
 * Changes the field owner to the alias
 *
 * @param table Aliased table
 * @param field Field of the table
 */
export function fieldOf<R extends Row, T>(
  table: TableLikeAlias<R>,
  field: TableField<R, T>
): TableField<R, T> {
  return {
    ...field,
    table: { kind: "AliasFieldOwner", alias: table.alias }
  };
}
