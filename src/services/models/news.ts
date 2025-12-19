export interface ICreateNews {
  titulo: string;
  descricao: string;
}

export interface INews {
  id: string;
  titulo: string;
  descricao: string;
}

export interface IPaginatedNews {
  data: Array<INews>;
  meta: IPagination;
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginationParams {
  page: number;
  limit: number;
}
