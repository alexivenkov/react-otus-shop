import { AuthType } from '@/components/Forms/Auth/types';
import { Pagination, Sorting } from '@/utils/api/responses';
import { OrderProduct, OrderStatus } from '@/models/order';

export interface AuthPayload {
  type: AuthType;
  email: string;
  password: string;
}

export interface PaginationRequest {
  pagination: Omit<Pagination, 'total'>;
  sorting: Sorting;
}

export interface CategoryPayload {
  id?: string;
  name: string;
  photo?: string;
}

export interface ProductPayload {
  id?: string;
  name: string;
  desc?: string;
  photo?: string;
  oldPrice?: number;
  price: number;
  category: string;
}

export interface CheckoutPayload {
  products: {
    id: string;
    quantity: number;
  }[];
  status: OrderStatus;
}
