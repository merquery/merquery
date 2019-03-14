import { assertNever } from "../../../Util";
import { FieldOwner } from "../../../../FieldOwner";
export function buildFieldOwnerName(fieldOwner: FieldOwner): string[] {
  switch (fieldOwner.kind) {
    case "AliasFieldOwner":
      return [fieldOwner.alias];
    case "TableFieldOwner":
      return [fieldOwner.schema, fieldOwner.table];
    default:
      return assertNever(fieldOwner);
  }
}
