export interface OneOrMoreArray<T> {
  first: T;
  other: T[];
}

export namespace OneOrMoreArrayUtil {
  export function just<T>(first: T, ...other: T[]): OneOrMoreArray<T> {
    return {
      first: first,
      other: other
    };
  }

  export function fromArray<T>(arr: T[]): OneOrMoreArray<T> {
    if (arr.length < 1)
      throw new Error(
        "Array needs atleast one element to be convertable to OneOrMore data type."
      );

    return {
      first: arr[0],
      other: arr.slice(1)
    };
  }

  export function append<T>(
    current: OneOrMoreArray<T> | undefined,
    arr: T[]
  ): OneOrMoreArray<T> {
    if (!current) {
      return fromArray(arr);
    }

    return {
      ...current,
      other: [...current.other, ...arr]
    };
  }

  export function toArray<T>(oneOrMoreArray: OneOrMoreArray<T>) {
    return [oneOrMoreArray.first, ...oneOrMoreArray.other];
  }

  export function length<T>(arr: OneOrMoreArray<T>) {
    return 1 + arr.other.length;
  }
}
