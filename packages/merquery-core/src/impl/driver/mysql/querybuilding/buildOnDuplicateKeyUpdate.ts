import {
  OnDuplicateKeyIgnore,
  OnDuplicateKey,
  OnDuplicateKeyUpdate
} from "../../../../InsertState";
import { TableField, val } from "../../../../Field";
import { Row } from "../../../../Row";
import { buildTableField } from "./buildTableField";
import { buildField } from "./buildField";
import { buildValueField } from "./buildValueField";
import { assertNever } from "../../../Util";
import { buildSetList } from "./buildSetList";

export function buildOnDuplicateKeyUpdate(
  duplicateKey: OnDuplicateKeyUpdate<any>
) {
  return `UPDATE ${buildSetList(duplicateKey.updates)}`;
}
