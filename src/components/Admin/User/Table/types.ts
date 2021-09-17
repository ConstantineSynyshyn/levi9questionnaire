export interface Column {
  title: string;
  fieldName: string;
}

export type ColumnsConfigType = ReadonlyArray<Column>;

export interface DataItem {
  [key: string]: any;
}

export type Data = ReadonlyArray<DataItem>;
