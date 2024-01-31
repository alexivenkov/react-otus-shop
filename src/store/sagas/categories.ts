import { call, put, select, takeLatest } from 'redux-saga/effects';
import { categoriesActions, categoriesSelectors } from '@/store/slices/categories';
import { api, getAuthHeader } from '@/utils/api';
import { CategoriesResponse } from '@/utils/api/responses';
import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryPayload, PaginationRequest } from '@/store/payloads';
import { Status } from '@/store/states';
import { Category } from '@/models/category';

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
        ...getAuthHeader(),
      }
    )) as CategoriesResponse;

    yield put(
      categoriesActions.set({
        status: Status.idle,
        error: null,
        data: categories.data,
        total: categories.pagination.total,
      })
    );
  } catch (e) {
    yield put(
      categoriesActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

function* createCategorySaga(action: PayloadAction<CategoryPayload>): Generator {
  try {
    const response = (yield call(
      [api, api.post],
      'categories',
      {
        name: action.payload.name,
        photo: action.payload.photo,
      },
      {
        ...getAuthHeader(),
      }
    )) as Category;

    const categories: Category[] = [response, ...((yield select(categoriesSelectors.categories)) as Category[])];

    yield put(
      categoriesActions.set({
        status: Status.succeeded,
        error: null,
        data: categories,
        total: categories.length,
      })
    );
  } catch (e) {
    yield put(
      categoriesActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

function* editCategorySaga(action: PayloadAction<CategoryPayload>): Generator {
  try {
    const response = (yield call(
      [api, api.put],
      `categories/${action.payload.id}`,
      {
        name: action.payload.name,
        photo: action.payload.photo,
      },
      {
        ...getAuthHeader(),
      }
    )) as Category;

    const categories: Category[] = (yield select(categoriesSelectors.categories)) as Category[];
    const index = categories.findIndex((category: Category) => category.id == action.payload.id);

    yield put(
      categoriesActions.set({
        status: Status.succeeded,
        error: null,
        data: [...categories.slice(0, index), response, ...categories.slice(index + 1)],
        total: categories.length + 1,
      })
    );
  } catch (e) {
    yield put(
      categoriesActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

function* deleteCategorySaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    yield call([api, api.delete], `categories/${action.payload.id}`, {}, { ...getAuthHeader() });
    const categories: Category[] = (yield select(categoriesSelectors.categories)) as Category[];

    yield put(
      categoriesActions.set({
        status: Status.succeeded,
        error: null,
        data: categories.filter((category: Category) => category.id != action.payload.id),
        total: categories.length - 1,
      })
    );
    yield put(
      categoriesActions.setMeta({
        status: Status.idle,
      })
    );
  } catch (e) {
    yield put(
      categoriesActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
    yield put(
      categoriesActions.setMeta({
        status: Status.idle,
      })
    );
  }
}

export function* categoriesWatcher(): Generator {
  yield takeLatest(categoriesActions.load.type, loadCategoriesSaga);
  yield takeLatest(categoriesActions.create.type, createCategorySaga);
  yield takeLatest(categoriesActions.edit.type, editCategorySaga);
  yield takeLatest(categoriesActions.delete.type, deleteCategorySaga);
}
