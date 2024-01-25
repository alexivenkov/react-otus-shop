import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '@/store';
import { Meta, ProfileState, Status } from '@/store/states';

export const PROFILE_SLICE = 'profile';

const initialSate: ProfileState = {
  status: Status.idle,
  error: null,
  data: null,
};

export const profileSlice = createSlice({
  name: PROFILE_SLICE,
  initialState: initialSate,
  reducers: {
    set: (state: ProfileState, action: PayloadAction<ProfileState>) => action.payload,
    setMeta: (state: ProfileState, action: PayloadAction<Partial<Meta>>) => {
      if (action.payload.status) {
        state.status = action.payload.status;
      }

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
    load: (state: ProfileState) => {
      state.status = Status.loading;
    },
    update: (state: ProfileState, action: PayloadAction<{ name: string }>) => {
      state.status = Status.loading;
    },
  },
});

export const profileActions = profileSlice.actions;

export const profileSelectors = {
  get: (state: State): State['profile'] => {
    return state.profile;
  },
  isAdmin: (state: State): boolean => state.profile.data?.isAdmin || false,
};

export const profile = profileSlice.reducer;
