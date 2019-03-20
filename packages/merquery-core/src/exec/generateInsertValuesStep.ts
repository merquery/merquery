import { chmod } from "fs";

export function generateInsertInterface(paramNumber: number) {}

export function generateInsertValuesStep(c: number) {
  if (c < 1) throw new Error("c must be atleast 1");

  const interfaces: string[] = [];
  const insertIntoMethods: string[] = [];
  const implementsList: string[] = [];
  const allTypeParams: number[] = [];

  for (let i = 0; i < c; i++) {
    allTypeParams.push(i + 1);
  }

  for (let i = 0; i < c; i++) {
    const paramNumber = i + 1;

    let typeParams: number[] = [];
    for (let a = 0; a < paramNumber; a++) {
      typeParams.push(a + 1);
    }

    const genericList = typeParams.map(tcount => `T${tcount}`).join(", ");

    const interfaceName = `InsertValuesStep${paramNumber}<R extends Row, ${genericList}>`;

    const returnType = `InsertValuesStep${paramNumber}<R, ${genericList}>`;

    const interfaceDef = `export interface ${interfaceName} extends InsertOnDuplicateKeyStep<R> {
    values(${typeParams
      .map(tcount => `value${tcount}: T${tcount}`)
      .join(", ")}): ${returnType};
}`;

    interfaces.push(interfaceDef);
    insertIntoMethods.push(
      `insertInto<R extends Row, ${genericList}>(table: Table<R>, ${typeParams
        .map(tcount => `field${tcount}: TableField<R, T${tcount}>`)
        .join(", ")}): ${returnType};`
    );

    implementsList.push(returnType);
  }

  return {
    interfaces: interfaces.join("\n\n"),
    insertIntoMethods: insertIntoMethods.join("\n\n"),
    implementsList: implementsList.join(", "),
    generics: allTypeParams.map(tcount => `T${tcount} = any`).join(", ")
  };
}

const a = generateInsertValuesStep(30);

console.log("Interfaces");
console.log("====================");
console.log(a.interfaces);
console.log("====================");
console.log("Insert Into Methods");
console.log("====================");
console.log(a.insertIntoMethods);
console.log("====================");
console.log("Implements list");
console.log("====================");
console.log(a.implementsList);
console.log("====================");
console.log("Generic List");
console.log("====================");
console.log(a.generics);
console.log("====================");
