import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthPayload } from '@/store/payloads';
import { authActions } from '@/store/slices/auth';
import { Status } from '@/store/states';

interface AuthResponse {
  token: string;
}

function* authSaga(action: PayloadAction<AuthPayload>): Generator {
  try {
    yield put(
      authActions.set({
        status: Status.succeeded,
        error: null,
        data: { token: 'test' },
      })
    );
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

export function* authWatcher(): Generator {
  yield takeLatest(authActions.signIn.type, authSaga);
  yield takeLatest(authActions.signUp.type, authSaga);
  //yield takeLatest(authActions.signOut.type, logoutSaga);
}
