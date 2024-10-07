export enum TaskStatus {
  Completed = "Completed",
  Incomplete = "Incomplete",
}

export interface FilterCriteria<T> {
  filters: {
    searchText: string;
  } & T;
  paging: {
    page: number;
    pageSize: number;
  };
  sorts?: {
    descending: boolean;
    field: string;
  }[];
}

export interface Task {
  _id: string;
  taskName: string;
  status: TaskStatus;
}
