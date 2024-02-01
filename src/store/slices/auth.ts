import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '@/store';
import { AuthState, Meta, Status } from '@/store/states';
import { AuthPayload } from '@/store/payloads';

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
    setMeta: (state: AuthState, action: PayloadAction<Partial<Meta>>) => {
      if (action.payload.status) {
        state.status = action.payload.status;
      }

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
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
  get: (state: State): State['auth'] => state.auth,
  token: (state: State): string | null => state.auth.data.token,
  status: (state: State): Status => state.auth.status,
  error: (state: State): Error => state.auth.error,
};

export const auth = authSlice.reducer;
