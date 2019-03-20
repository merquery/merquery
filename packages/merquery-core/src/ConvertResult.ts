export type ConvertResult<T> =
  | { kind: "ConvertSuccess"; value: T }
  | { kind: "ConvertError"; reason: string };
