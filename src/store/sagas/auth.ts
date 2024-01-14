import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from '@/store/slices/auth';
import { Status } from '@/store/states';
import { AuthType } from '@/components/Forms/Auth/types';
import { api } from '@/utils/api';
import { AuthPayload } from '@/store/payloads';
import { storage, TOKEN_KEY } from '@/utils/storage';

interface AuthResponse {
  token: string;
}

function* authSaga(action: PayloadAction<AuthPayload>): Generator {
  try {
    const authPath = action.payload.type == AuthType.signIn ? 'signin' : 'signup';
    const response = (yield call([api, api.post], authPath, { ...action.payload })) as AuthResponse;

    yield put(
      authActions.set({
        status: Status.succeeded,
        error: null,
        data: { token: response.token },
      })
    );

    storage.set(TOKEN_KEY, response.token);
  } catch (e) {
    console.log(e);

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
}

export function* authWatcher(): Generator {
  yield takeLatest(authActions.auth.type, authSaga);
  yield takeLatest(authActions.signOut.type, signOutSaga);
}
