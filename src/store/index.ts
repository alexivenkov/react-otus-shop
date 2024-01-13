import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { init } from '@/store/slices/init';
import { auth } from '@/store/slices/auth';
import { sagas } from '@/store/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    init,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
