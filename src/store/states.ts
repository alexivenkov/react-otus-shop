export enum Status {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface State<T> {
  status: Status;
  error: Error;
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
}

export type AuthState = State<{ token: string }>;

export type ProfileState = State<Profile>;
