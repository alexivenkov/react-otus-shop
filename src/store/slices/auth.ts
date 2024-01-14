import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '@/store';
import { AuthState, Status } from '@/store/states';
import { AuthPayload } from '@/store/payloads';
import { AuthType } from '@/components/Forms/Auth/types';

export const AUTH_SLICE = 'auth';

const initialState: AuthState = {
  status: Status.idle,
  error: null,
  data: {
    token: null,
  },
};

const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState: initialState,
  reducers: {
    set: (state: AuthState, action: PayloadAction<AuthState>) => action.payload,
    auth: (state: AuthState, action: PayloadAction<AuthPayload>) => {
      state.status = Status.loading;
    },
    signOut: (state: AuthState) => {
      state.status = Status.loading;
    },
  },
});

export const authActions = authSlice.actions;

export const authSelectors = {
  get: (state: State): State['auth'] => {
    return state.auth;
  },
  token: (state: State): string | null => {
    return state.auth.data.token;
  },
  status: (state: State): Status => {
    return state.auth.status;
  },
};

export const auth = authSlice.reducer;
