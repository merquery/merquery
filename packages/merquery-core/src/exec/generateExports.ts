import { readdirSync } from "fs";

function removeExtension(dir: string) {
  const split = dir.split(".");

  return split.slice(0, -1).join(".");
}

console.log(
  readdirSync("./src")
    .filter(dir => {
      const split = dir.split(".");

      return split[split.length - 1] === "ts";
    })
    .map(dir => `export * from "./${removeExtension(dir)}";`)
    .join("\n")
);
