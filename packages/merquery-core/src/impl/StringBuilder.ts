export const StringBuilder = () => {
  const strings: string[] = [];

  return {
    append: (str: string) => strings.push(str),
    toString: () => strings.join("")
  };
};
