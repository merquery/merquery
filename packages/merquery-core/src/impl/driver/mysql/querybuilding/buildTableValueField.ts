import { TableValueField } from "../../../../TableValueField";
import { Row } from "../../../../Row";
import { DataTypeProps } from "../../../../DataTypeProps";
import { buildValueField } from "./buildValueField";
import { val } from "../../../util/val";
import { buildField } from "./buildField";
import { MysqlConverterFactory } from "../conversion/MysqlConverterFactory";

export function buildTableValueField<R extends Row, T>(
  field: TableValueField<R, T>
): string {
  const convertResult = MysqlConverterFactory(
    field.tableField.type
  ).convertToMysql(field.tableField.type, field.value);

  if (convertResult.kind === "ConvertError") {
    throw new Error(
      `Error converting value for field ${buildField(field)}. Reason: ${
        convertResult.reason
      }. Value was ${JSON.stringify(field.value)}.`
    );
  }

  return buildValueField(val(convertResult.value));
}
