import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta, ProductsState, Status } from '@/store/states';
import { PaginationRequest, ProductPayload } from '@/store/payloads';
import { State } from '@/store';
import { Product } from '@/models/product';

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
    setMeta: (state: ProductsState, action: PayloadAction<Partial<Meta>>) => {
      if (action.payload.status) {
        state.status = action.payload.status;
      }

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
    load: (state: ProductsState, action: PayloadAction<PaginationRequest & { categories: string[] }>) => {
      state.status = Status.loading;
    },
    create: (state: ProductsState, action: PayloadAction<ProductPayload>) => {
      state.status = Status.loading;
    },
    edit: (state: ProductsState, action: PayloadAction<ProductPayload>) => {
      state.status = Status.loading;
    },
    delete: (state: ProductsState, action: PayloadAction<{ id: string }>) => {
      state.status = Status.loading;
    },
  },
});

export const productsActions = productsSlice.actions;

export const productsSelectors = {
  get: (state: State): State['products'] => state.products,
  products: (state: State): Product[] => state.products.data,
  status: (state: State): Status => state.products.status,
  total: (state: State): number => state.products.total,
};

export const products = productsSlice.reducer;
