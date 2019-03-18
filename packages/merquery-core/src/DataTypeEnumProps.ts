export interface DataTypeEnumProps<T extends string> {
  type: "ENUM";
  options: T[];
  nullable: boolean;
}
