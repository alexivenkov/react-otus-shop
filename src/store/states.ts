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

export type AuthState = State<{ token: string }>;
