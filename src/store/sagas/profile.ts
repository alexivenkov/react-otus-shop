import { call, put, takeLatest } from 'redux-saga/effects';
import { profileActions } from '@/store/slices/profile';
import { api, getAuthHeader } from '@/utils/api';
import { ProfileResponse } from '@/utils/api/responses';
import { Status } from '@/store/states';
import { PayloadAction } from '@reduxjs/toolkit';

const adminEmail = 'alex.ivenkov@gmail.com';

function* loadProfileSaga(): Generator {
  try {
    const profile = (yield call([api, api.get], 'profile', {}, { ...getAuthHeader() })) as ProfileResponse;

    yield put(
      profileActions.set({
        status: Status.succeeded,
        error: null,
        data: {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          signUpDate: profile.signUpDate,
          isAdmin: profile.email == adminEmail,
        },
      })
    );
    yield put(profileActions.setMeta({ status: Status.idle }));
  } catch (e) {
    console.error(e);

    yield put(profileActions.setMeta({ status: Status.failed, error: e }));
  }
}

function* updateProfileSaga(action: PayloadAction<{ name: string }>): Generator {
  try {
    const profile = (yield call(
      [api, api.post],
      'profile',
      { ...action.payload },
      { ...getAuthHeader() }
    )) as ProfileResponse;

    yield put(
      profileActions.set({
        status: Status.succeeded,
        error: null,
        data: {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          signUpDate: profile.signUpDate,
          isAdmin: profile.email == adminEmail,
        },
      })
    );
  } catch (e) {
    console.error(e);

    yield put(profileActions.setMeta({ status: Status.failed, error: e }));
  }
}

export function* profileWatcher(): Generator {
  yield takeLatest(profileActions.load.type, loadProfileSaga);
  yield takeLatest(profileActions.update.type, updateProfileSaga);
}
