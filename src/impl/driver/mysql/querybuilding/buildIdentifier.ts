import * as SqlString from "sqlstring";
export function buildIdentifier(...parts: string[]) {
  return SqlString.escapeId(parts.join("."));
}
