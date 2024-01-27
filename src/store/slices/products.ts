import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta, ProductsState, Status } from '@/store/states';
import { PaginationRequest } from '@/store/payloads';
import { State } from '@/store';

export const PRODUCTS_SLICE = 'products';

const initialState: ProductsState = {
  status: Status.idle,
  error: null,
  data: [],
  total: 0,
};

export const productsSlice = createSlice({
  name: PRODUCTS_SLICE,
  initialState: initialState,
  reducers: {
    set: (state: ProductsState, action: PayloadAction<ProductsState>) => action.payload,
    setMeta: (state: ProductsState, action: PayloadAction<Meta>) => {
      if (action.payload.status) {
        state.status = action.payload.status;
      }

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
    load: (state: ProductsState, action: PayloadAction<PaginationRequest>) => {},
  },
});

export const productsActions = productsSlice.actions;

export const productsSelectors = {
  get: (state: State): State['products'] => {
    return state.products;
  },
};

export const products = productsSlice.reducer;
