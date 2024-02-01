import { all } from 'redux-saga/effects';
import { authWatcher } from '@/store/sagas/auth';
import { initWatcher } from '@/store/sagas/init';
import { profileWatcher } from '@/store/sagas/profile';
import { categoriesWatcher } from '@/store/sagas/categories';
import { productsWatcher } from '@/store/sagas/products';
import { cartWatcher } from '@/store/sagas/cart';
import { ordersWatcher } from '@/store/sagas/orders';

export function* sagas() {
  yield all([
    initWatcher(),
    authWatcher(),
    profileWatcher(),
    categoriesWatcher(),
    productsWatcher(),
    cartWatcher(),
    ordersWatcher(),
  ]);
}
