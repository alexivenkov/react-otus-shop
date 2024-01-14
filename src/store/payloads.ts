import { AuthType } from '@/components/Forms/Auth/types';

export interface AuthPayload {
  type: AuthType;
  email: string;
  password: string;
}
