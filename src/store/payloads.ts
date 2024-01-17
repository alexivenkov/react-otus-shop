import { AuthType } from '@/components/Forms/Auth/types';
import { Pagination, Sorting } from '@/utils/api/responses';

export interface AuthPayload {
  type: AuthType;
  email: string;
  password: string;
}

export interface PaginationRequest {
  pagination: Omit<Pagination, 'total'>;
  sorting: Sorting;
}
