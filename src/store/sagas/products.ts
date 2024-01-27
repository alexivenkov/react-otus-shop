import { call, put, takeLatest } from 'redux-saga/effects';
import { productsActions } from '@/store/slices/products';
import { api } from '@/utils/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest } from '@/store/payloads';
import { ProductsResponse } from '@/utils/api/responses';
import { Status } from '@/store/states';

function* loadProducts(action: PayloadAction<PaginationRequest>): Generator {
  try {
    const response = (yield call(
      [api, api.get],
      'products',
      {
        pagination: JSON.stringify(action.payload.pagination),
        sorting: JSON.stringify(action.payload.sorting),
      },
      {
        //...getAuthHeader(),
      }
    )) as ProductsResponse;

    yield put(
      productsActions.set({
        status: Status.idle,
        error: null,
        data: response.data,
        total: response.pagination.total,
      })
    );
  } catch (e) {
    console.error(e);

    yield put(
      productsActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

export function* productsWatcher(): Generator {
  yield takeLatest(productsActions.load.type, loadProducts);
}
