import { call, put, takeLatest } from 'redux-saga/effects';
import { categoriesActions } from '@/store/slices/categories';
import { api } from '@/utils/api';
import { CategoriesResponse } from '@/utils/api/responses';
import { PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest } from '@/store/payloads';
import { Status } from '@/store/states';

function* loadCategoriesSaga(action: PayloadAction<PaginationRequest>): Generator {
  try {
    const categories = (yield call(
      [api, api.get],
      'categories',
      {
        pagination: JSON.stringify(action.payload.pagination),
        sorting: JSON.stringify(action.payload.sorting),
      },
      {
        /* ...getAuthHeader()*/
      }
    )) as CategoriesResponse;

    yield put(
      categoriesActions.set({
        status: Status.succeeded,
        error: null,
        data: categories.data,
        total: categories.pagination.total,
      })
    );
    console.log(categories);
  } catch (e) {
    console.log(e);
  }
}

export function* categoriesWatcher(): Generator {
  yield takeLatest(categoriesActions.load, loadCategoriesSaga);
}
