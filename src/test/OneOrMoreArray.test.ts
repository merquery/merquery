import { OneOrMoreArrayUtil } from "../impl/OneOrMoreArray";

test("justFirst builds a OneOrMoreArray with only first element", () => {
  expect(OneOrMoreArrayUtil.justFirst("123")).toEqual({
    first: "123",
    other: []
  });
});

test("fromArray throws exception with empty array as parameter", () => {
  expect(() => OneOrMoreArrayUtil.fromArray([])).toThrowError(
    "Array needs atleast one element to be convertable to OneOrMore data type."
  );
});

test("fromArray with one element creates OneOrMoreArray with only first element", () => {
  expect(OneOrMoreArrayUtil.fromArray([1])).toEqual({
    first: 1,
    other: []
  });
});

test("fromArray builds OneOrMoreArray with first element and other elements", () => {
  expect(OneOrMoreArrayUtil.fromArray([1, 2, 3])).toEqual({
    first: 1,
    other: [2, 3]
  });
});

test("append builds OneOrMoreArray with new elements appended to other", () => {
  expect(
    OneOrMoreArrayUtil.append(OneOrMoreArrayUtil.fromArray([1, 2, 3]), [4, 5])
  ).toEqual({
    first: 1,
    other: [2, 3, 4, 5]
  });
});

test("toArray builds array with first element as first element in array and other elements appended to it", () => {
  expect(
    OneOrMoreArrayUtil.toArray(OneOrMoreArrayUtil.fromArray([1, 2, 3]))
  ).toEqual([1, 2, 3]);
});

test("toArray builds array with first element as first element in array and other elements appended to it", () => {
  expect(OneOrMoreArrayUtil.append(undefined, [1, 2, 3])).toEqual(
    OneOrMoreArrayUtil.fromArray([1, 2, 3])
  );
});
