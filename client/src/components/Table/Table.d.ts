import { ReactNode, Ref } from "react";

export interface TableValue {
  label: string;
  key: string | number;
}

export interface TableColumn extends TableValue {
  addon?: ReactNode;
}

export default interface TableProps {
  filterCriteria: any;
  setFilterCriteria: (value: any) => void;
  columns: TableColumn[];
  dataSource: any;
  totalItems: number;
  rowSelected?: number[];
  setRowSelection?: (value: any) => void;
  reference?: Ref;
  isLoading?: boolean;
  additionalSection?: ReactNode;
}
