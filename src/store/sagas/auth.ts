import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from '@/store/slices/auth';
import { Status } from '@/store/states';
import { AuthType } from '@/components/Forms/Auth/types';
import { api } from '@/utils/api';
import { AuthPayload } from '@/store/payloads';
import { CART_KEY, storage, TOKEN_KEY } from '@/utils/storage';
import { AuthResponse } from '@/utils/api/responses';
import { profileActions } from '@/store/slices/profile';
import { categoriesActions } from '@/store/slices/categories';
import { ordersActions } from '@/store/slices/orders';

('alex.ivenkov');

const COMMAND_ID = 'alex.ivenkov';

function* authSaga(action: PayloadAction<AuthPayload>): Generator {
  try {
    const authPath = action.payload.type == AuthType.signIn ? 'signin' : 'signup';
    const payload =
      action.payload.type == AuthType.signUp ? { ...action.payload, commandId: COMMAND_ID } : action.payload;

    const response = (yield call([api, api.post], authPath, payload)) as AuthResponse;

    yield put(
      authActions.set({
        status: Status.succeeded,
        error: null,
        data: { token: response.token },
      })
    );

    storage.set(TOKEN_KEY, response.token);

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
  } catch (e) {
    yield put(
      authActions.set({
        status: Status.failed,
        error: e,
        data: { token: null },
      })
    );
  }
}

function* signOutSaga(): Generator {
  yield put(
    authActions.set({
      status: Status.succeeded,
      error: null,
      data: {
        token: null,
      },
    })
  );

  storage.remove(TOKEN_KEY);
  storage.remove(CART_KEY);
}

export function* authWatcher(): Generator {
  yield takeLatest(authActions.auth.type, authSaga);
  yield takeLatest(authActions.signOut.type, signOutSaga);
}
