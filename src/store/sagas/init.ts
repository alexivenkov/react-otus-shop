import { put, takeLatest } from 'redux-saga/effects';
import { initActions } from '@/store/slices/init';
import { storage, TOKEN_KEY } from '@/utils/storage';
import { authActions } from '@/store/slices/auth';
import { Status } from '@/store/states';

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
