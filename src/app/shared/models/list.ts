export type FilterKey = string | number;
export type FilterValue = string | number | string[] | number[];
export type Filters = Map<FilterKey, FilterValue>;

export interface SerializedFilters {
  [key: string ]: FilterValue;
}

interface SortInfo {
  prop: string;
  dir: string;
}

export class LoadListPayload {

  public sortInfo: SortInfo = {prop: 'id', dir: 'asc'};

  public filters: Filters = null;

  constructor(params?: { sortInfo?: SortInfo, filters?: Filters }) {
    if (params) {
      Object.assign(this, params);
    }
  }
}

export interface LoadListSuccessPayload<T> {
  count: number;
  data: T[];
}
