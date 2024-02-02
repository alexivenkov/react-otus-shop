import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Meta, Status } from '@/store/states';
import { OrderProduct } from '@/models/order';
import { Product } from '@/models/product';
import { State } from '@/store';

export const CART_SLICE = 'cart';

const initialState: CartState = {
  status: Status.idle,
  error: null,
  data: [],
  total: 0,
  sum: 0,
};

export const cartSlice = createSlice({
  name: CART_SLICE,
  initialState: initialState,
  reducers: {
    set: (state: CartState, action: PayloadAction<CartState>) => action.payload,
    setSum: (state: CartState, action: PayloadAction<number>) => {
      state.sum = action.payload;
    },
    setMeta: (state: CartState, action: PayloadAction<Partial<Meta>>) => {
      if (action.payload.status) {
        state.status = action.payload.status;
      }

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
    add: (state: CartState, action: PayloadAction<Product>) => {
      const existed = state.data.filter((item: OrderProduct) => item.product.id == action.payload.id).shift();

      if (!existed) {
        state.total++;
      }

      existed
        ? existed.quantity++
        : state.data.push({
            product: action.payload,
            quantity: 1,
          });
    },
    remove: (state: CartState, action: PayloadAction<Product>) => {
      const existed = state.data.filter((item: OrderProduct) => item.product.id == action.payload.id).shift();

      existed.quantity--;

      if (existed.quantity == 0) {
        state.data = state.data.filter((item: OrderProduct) => item.product.id != existed.product.id);
        state.total--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export const cartSelectors = {
  get: (state: State): State['cart'] => state.cart,
  total: (state: State): number => state.cart.total,
  sum: (state: State): number => state.cart.sum,
  products: (state: State): OrderProduct[] => state.cart.data,
};

export const cart = cartSlice.reducer;
