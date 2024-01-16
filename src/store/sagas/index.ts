import { all } from 'redux-saga/effects';
import { authWatcher } from '@/store/sagas/auth';
import { initWatcher } from '@/store/sagas/init';
import { profileWatcher } from '@/store/sagas/profile';

export function* sagas() {
  yield all([initWatcher(), authWatcher(), profileWatcher()]);
}
