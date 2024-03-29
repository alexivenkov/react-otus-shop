import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '@/store';
import { CategoriesState, Meta, Status } from '@/store/states';
import { CategoryPayload, PaginationRequest } from '@/store/payloads';
import { Category } from '@/models/category';

export const CATEGORIES_SLICE = 'categories';

const initialState: CategoriesState = {
  status: Status.idle,
  error: null,
  total: 0,
  data: [],
};

export const categoriesSlice = createSlice({
  name: CATEGORIES_SLICE,
  initialState: initialState,
  reducers: {
    set: (state: CategoriesState, action: PayloadAction<CategoriesState>) => action.payload,
    setMeta: (state: CategoriesState, action: PayloadAction<Partial<Meta>>) => {
      if (action.payload.status) {
        state.status = action.payload.status;
      }

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
    load: (state: CategoriesState, action: PayloadAction<PaginationRequest>) => {
      state.status = Status.loading;
    },
    create: (state: CategoriesState, action: PayloadAction<CategoryPayload>) => {
      state.status = Status.loading;
    },
    edit: (state: CategoriesState, action: PayloadAction<CategoryPayload>) => {
      state.status = Status.loading;
    },
    delete: (state: CategoriesState, action: PayloadAction<{ id: string }>) => {
      state.status = Status.loading;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export const categoriesSelectors = {
  get: (state: State): State['categories'] => state.categories,
  categories: (state: State): Category[] => state.categories.data,
  status: (state: State): Status => state.categories.status,
  total: (state: State): number => state.categories.total,
};

export const categories = categoriesSlice.reducer;
