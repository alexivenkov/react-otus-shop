import { Category } from '@/models/category';
import { Product } from '@/models/product';
import { Order } from '@/models/order';

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

export interface ProductsResponse {
  data: Product[];
  pagination: Pagination;
  sorting: Sorting;
}

export interface OrdersResponse {
  data: Order[];
  pagination: Pagination;
  sorting: Sorting;
}
