import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { init } from '@/store/slices/init';
import { auth } from '@/store/slices/auth';
import { profile } from '@/store/slices/profile';
import { categories } from '@/store/slices/categories';
import { sagas } from '@/store/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    init,
    auth,
    profile,
    categories,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
