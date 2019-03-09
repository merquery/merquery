export interface OneOrMoreArray<T> {
  first: T;
  other: T[];
}

export namespace OneOrMoreArrayUtil {
  export function justFirst<T>(first: T): OneOrMoreArray<T> {
    return {
      first: first,
      other: []
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
    current: OneOrMoreArray<T>,
    arr: T[]
  ): OneOrMoreArray<T> {
    return {
      ...current,
      other: [...current.other, ...arr]
    };
  }

  export function toArray<T>(oneOrMoreArray: OneOrMoreArray<T>) {
    return [oneOrMoreArray.first, ...oneOrMoreArray.other];
  }
}
