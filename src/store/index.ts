import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { init } from '@/store/slices/init';
import { auth } from '@/store/slices/auth';
import { profile } from '@/store/slices/profile';
import { categories } from '@/store/slices/categories';
import { products } from '@/store/slices/products';
import { sagas } from '@/store/sagas';
import { cart } from '@/store/slices/cart';
import { orders } from '@/store/slices/orders';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    init,
    auth,
    profile,
    categories,
    products,
    cart,
    orders,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
