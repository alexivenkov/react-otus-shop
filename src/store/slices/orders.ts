import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meta, OrdersState, Status } from '@/store/states';
import { CheckoutPayload, PaginationRequest } from '@/store/payloads';
import { State } from '@/store';
import { Order } from '@/models/order';

export const ORDERS_SLICE = 'orders';

const initialState: OrdersState = {
  status: Status.idle,
  error: null,
  data: [],
  total: 0,
};

const ordersSlice = createSlice({
  name: ORDERS_SLICE,
  initialState: initialState,
  reducers: {
    set: (state: OrdersState, action: PayloadAction<OrdersState>) => action.payload,
    setMeta: (state: OrdersState, action: PayloadAction<Partial<Meta>>) => {
      if (action.payload.status) {
        state.status = action.payload.status;
      }

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
    load: (state: OrdersState, action: PayloadAction<PaginationRequest>) => {
      state.status = Status.loading;
    },
    checkOut: (state: OrdersState, action: PayloadAction<CheckoutPayload>) => {
      state.status = Status.loading;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export const ordersSelectors = {
  get: (state: State): State['orders'] => state.orders,
  orders: (state: State): Order[] => state.orders.data,
  meta: (state: State): Meta => {
    return {
      status: state.orders.status,
      error: state.orders.error,
    };
  },
};

export const orders = ordersSlice.reducer;
