export interface TableRow {
  [column: string]: any;
}

export interface ResultRow {
  [table: string]: TableRow;
}
