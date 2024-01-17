import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '@/store';
import { CategoriesState, Status } from '@/store/states';
import { Pagination, Sorting } from '@/utils/api/responses';
import { PaginationRequest } from '@/store/payloads';
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
    load: (state: CategoriesState, action: PayloadAction<PaginationRequest>) => {},
  },
});

export const categoriesActions = categoriesSlice.actions;

export const categoriesSelectors = {
  get: (state: State): State['categories'] => {
    return state.categories;
  },
  categories: (state: State): Category[] => {
    return state.categories.data;
  },
  total: (state: State): number => {
    return state.categories.total;
  },
};

export const categories = categoriesSlice.reducer;
