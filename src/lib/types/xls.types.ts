export type Primitive = string | number | boolean | Date | null;

export type Row = Record<string, Primitive>;

export type SheetData = Array<Row>;
