import { call, put, select, takeLatest } from 'redux-saga/effects';
import { productsActions, productsSelectors } from '@/store/slices/products';
import { api, getAuthHeader } from '@/utils/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest, ProductPayload } from '@/store/payloads';
import { ProductsResponse } from '@/utils/api/responses';
import { Status } from '@/store/states';
import { Product } from '@/models/product';

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
        ...getAuthHeader(),
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

function* createProductSaga(action: PayloadAction<ProductPayload>): Generator {
  try {
    const response = (yield call(
      [api, api.post],
      'products',
      {
        name: action.payload.name,
        desc: action.payload.desc,
        photo: action.payload.photo,
        oldPrice: action.payload.oldPrice,
        price: action.payload.price,
        categoryId: action.payload.category,
      },
      {
        ...getAuthHeader(),
      }
    )) as Product;

    const products: Product[] = [response, ...((yield select(productsSelectors.products)) as Product[])];

    yield put(
      productsActions.set({
        status: Status.succeeded,
        error: null,
        data: products,
        total: products.length,
      })
    );
  } catch (e) {
    yield put(
      productsActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

function* editProductSaga(action: PayloadAction<ProductPayload>): Generator {
  try {
    const response = (yield call(
      [api, api.put],
      `products/${action.payload.id}`,
      {
        name: action.payload.name,
        desc: action.payload.desc,
        photo: action.payload.photo,
        oldPrice: action.payload.oldPrice,
        price: action.payload.price,
        categoryId: action.payload.category,
      },
      {
        ...getAuthHeader(),
      }
    )) as Product;

    const products: Product[] = (yield select(productsSelectors.products)) as Product[];
    const index = products.findIndex((products: Product) => products.id == action.payload.id);

    yield put(
      productsActions.set({
        status: Status.succeeded,
        error: null,
        data: [...products.slice(0, index), response, ...products.slice(index + 1)],
        total: products.length + 1,
      })
    );
  } catch (e) {
    yield put(
      productsActions.setMeta({
        status: Status.failed,
        error: e,
      })
    );
  }
}

function* deleteProductSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    yield call([api, api.delete], `products/${action.payload.id}`, {}, { ...getAuthHeader() });
    const products: Product[] = (yield select(productsSelectors.products)) as Product[];

    yield put(
      productsActions.set({
        status: Status.succeeded,
        error: null,
        data: products.filter((product: Product) => product.id != action.payload.id),
        total: products.length - 1,
      })
    );
    yield put(
      productsActions.setMeta({
        status: Status.idle,
        error: null,
      })
    );
  } catch (e) {
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
  yield takeLatest(productsActions.create.type, createProductSaga);
  yield takeLatest(productsActions.edit.type, editProductSaga);
  yield takeLatest(productsActions.delete.type, deleteProductSaga);
}
