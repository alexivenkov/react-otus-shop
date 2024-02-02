import { put, takeLatest } from 'redux-saga/effects';
import { initActions } from '@/store/slices/init';
import { CART_KEY, storage, TOKEN_KEY } from '@/utils/storage';
import { authActions } from '@/store/slices/auth';
import { Status } from '@/store/states';
import { profileActions } from '@/store/slices/profile';
import { categoriesActions } from '@/store/slices/categories';
import { cartActions } from '@/store/slices/cart';
import { ordersActions } from '@/store/slices/orders';

export function* initializeSaga(): Generator {
  const token = storage.get(TOKEN_KEY);

  if (token) {
    yield put(
      authActions.set({
        status: Status.idle,
        error: null,
        data: {
          token: token,
        },
      })
    );
    yield put(profileActions.load());
    yield put(
      categoriesActions.load({
        pagination: { pageNumber: 1, pageSize: 8 },
        sorting: { type: 'ASC', field: 'name' },
      })
    );

    yield put(
      ordersActions.load({
        pagination: { pageNumber: 1, pageSize: 8 },
        sorting: { type: 'ASC', field: 'name' },
      })
    );

    try {
      const cart = JSON.parse(storage.get(CART_KEY));

      if (cart) {
        yield put(
          cartActions.set({
            status: Status.idle,
            error: null,
            data: cart.data,
            total: cart.total,
            sum: cart.sum,
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  yield put(
    initActions.set({
      status: Status.succeeded,
      error: null,
    })
  );
}

export function* initWatcher(): Generator {
  yield takeLatest(initActions.run.type, initializeSaga);
}
