import { put, select, takeLatest, call } from 'redux-saga/effects';
import { cartActions, cartSelectors } from '@/store/slices/cart';
import { CartState } from '@/store/states';
import { CART_KEY, storage } from '@/utils/storage';
import { OrderProduct } from '@/models/order';

function* dumpCartToLocalStorageSaga(): Generator {
  const cart = (yield select(cartSelectors.get)) as CartState;

  storage.set(CART_KEY, JSON.stringify({ data: cart.data, total: cart.total, sum: cart.sum }));
}

function* calculateTotalPriceSaga(): Generator {
  const cart = (yield select(cartSelectors.get)) as CartState;

  const sum = cart.data
    .map((item: OrderProduct) => item.product.price * item.quantity)
    .reduce((totalSum: number, productSum: number) => totalSum + productSum);

  yield put(cartActions.setSum(sum));
}

function* handleCartChange(): Generator {
  yield call(calculateTotalPriceSaga);
  yield call(dumpCartToLocalStorageSaga);
}

export function* cartWatcher(): Generator {
  yield takeLatest(cartActions.add.type, handleCartChange);
  yield takeLatest(cartActions.remove.type, handleCartChange);
}
