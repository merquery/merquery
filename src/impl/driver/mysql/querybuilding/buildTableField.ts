import { TableField } from "../../../../Field";
import { buildIdentifier } from "./buildIdentifier";
import { buildFieldOwnerName } from "./buildFieldOwnerName";
export function buildTableField<T>(field: TableField<any, T>) {
  return buildIdentifier(
    ...[...buildFieldOwnerName(field.table), field.column]
  );
}
