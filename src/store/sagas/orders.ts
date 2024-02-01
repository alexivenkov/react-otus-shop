import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ordersActions, ordersSelectors } from '@/store/slices/orders';
import { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutPayload } from '@/store/payloads';
import { api, getAuthHeader } from '@/utils/api';
import { Status } from '@/store/states';
import { OrderProduct } from '@/models/order';
import { CART_KEY, storage } from '@/utils/storage';
import { cartActions } from '@/store/slices/cart';

function* checkOutSaga(action: PayloadAction<CheckoutPayload>): Generator {
  try {
    const response = (yield call([api, api.post], 'orders', action.payload, { ...getAuthHeader() })) as OrderProduct;
    const orders: OrderProduct[] = [response, ...((yield select(ordersSelectors.orders)) as OrderProduct[])];

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
  yield takeLatest(ordersActions.checkOut, checkOutSaga);
}
