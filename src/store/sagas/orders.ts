import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ordersActions, ordersSelectors } from '@/store/slices/orders';
import { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutPayload, PaginationRequest } from '@/store/payloads';
import { api, getAuthHeader } from '@/utils/api';
import { Status } from '@/store/states';
import { Order } from '@/models/order';
import { CART_KEY, storage } from '@/utils/storage';
import { cartActions } from '@/store/slices/cart';
import { OrdersResponse } from '@/utils/api/responses';

function* loadOrdersSaga(action: PayloadAction<PaginationRequest>): Generator {
  try {
    const response = (yield call(
      [api, api.get],
      'orders',
      {
        pagination: JSON.stringify(action.payload.pagination),
        sorting: JSON.stringify(action.payload.sorting),
      },
      {
        ...getAuthHeader(),
      }
    )) as OrdersResponse;

    yield put(
      ordersActions.set({
        status: Status.succeeded,
        error: null,
        data: response.data,
        total: response.pagination.total,
      })
    );
  } catch (e) {
    console.error(e);

    yield put(
      ordersActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

function* checkOutSaga(action: PayloadAction<CheckoutPayload>): Generator {
  try {
    const response = (yield call([api, api.post], 'orders', action.payload, { ...getAuthHeader() })) as Order;
    const orders: Order[] = [response, ...((yield select(ordersSelectors.orders)) as Order[])];

    yield put(
      ordersActions.set({
        status: Status.succeeded,
        error: null,
        data: orders,
        total: orders.length,
      })
    );

    storage.remove(CART_KEY);
    yield put(
      cartActions.set({
        status: Status.idle,
        error: null,
        data: [],
        total: 0,
        sum: 0,
      })
    );
  } catch (e) {
    yield put(
      ordersActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

export function* ordersWatcher(): Generator {
  yield takeLatest(ordersActions.load.type, loadOrdersSaga);
  yield takeLatest(ordersActions.checkOut, checkOutSaga);
}
