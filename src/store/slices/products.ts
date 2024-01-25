import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Status } from '@/store/states';
import { PaginationRequest } from '@/store/payloads';

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
    load: (state: ProductsState, action: PayloadAction<PaginationRequest>) => {},
  },
});

export const productsActions = productsSlice.actions;

export const productsSelectors = {};

export const products = productsSlice.reducer;
