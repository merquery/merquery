export function i<T1, T2, R>(a: T1, fn: (a: T1, b: T2) => R, b: T2): R {
  return fn(a, b);
}
