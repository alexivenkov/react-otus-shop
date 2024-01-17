import { Category } from '@/models/category';

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export interface Sorting {
  type: string;
  field: string;
}

export interface AuthResponse {
  token: string;
}

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
}

export interface CategoriesResponse {
  data: Category[];
  pagination: Pagination;
  sorting: Sorting;
}
