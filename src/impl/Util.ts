export function assertNever(a: never): never {
  throw new Error(`Unexpected value ${a}`);
}
