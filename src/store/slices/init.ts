import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '@/store';
import { InitializationState, Status } from '@/store/states';

export const INIT_SLICE = 'init';

const initialState: InitializationState = {
  status: Status.idle,
  error: null,
};

const initSlice = createSlice({
  name: INIT_SLICE,
  initialState: initialState,
  reducers: {
    run: (state: InitializationState) => {
      state.status = Status.loading;
    },
    set: (state: InitializationState, action: PayloadAction<{ status: Status; error: Error }>) => action.payload,
  },
});
export const initActions = initSlice.actions;

export const initSelectors = {
  get: (state: State): State['init'] => {
    return state.init;
  },
};

export const init = initSlice.reducer;
