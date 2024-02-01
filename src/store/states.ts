import { Category } from '@/models/category';
import { Product } from '@/models/product';
import { OrderProduct } from '@/models/order';

export enum Status {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface Meta {
  status: Status;
  error: Error;
}

export interface Countable {
  total: number;
}

export interface State<T> extends Meta {
  data: T;
}

export interface InitializationState {
  status: Status;
  error: Error;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  signUpDate: Date;
  isAdmin: boolean;
}

export type AuthState = State<{ token: string }>;
export type ProfileState = State<Profile>;

export type CategoriesState = State<Category[]> & Countable;
export type ProductsState = State<Product[]> & Countable;
export type CartState = State<OrderProduct[]> & Countable & { sum: number };
export type OrdersState = State<OrderProduct[]> & Countable;
