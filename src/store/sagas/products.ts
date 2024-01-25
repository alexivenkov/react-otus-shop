import { call, takeLatest } from 'redux-saga/effects';
import { productsActions } from '@/store/slices/products';
import { api, getAuthHeader } from '@/utils/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest } from '@/store/payloads';

function* loadProducts(action: PayloadAction<PaginationRequest>): Generator {
  try {
    const response = yield call(
      [api, api.get],
      'products',
      {
        pagination: JSON.stringify(action.payload.pagination),
        sorting: JSON.stringify(action.payload.sorting),
      },
      {
        //...getAuthHeader(),
      }
    );
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

export function* productsWatcher(): Generator {
  yield takeLatest(productsActions.load.type, loadProducts);
}
