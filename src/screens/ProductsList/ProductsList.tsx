import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, productsSelectors } from '@/store/slices/products';
import { ProductsList as List } from '@/components/ProductsList/ProductsList';
import { profileSelectors } from '@/store/slices/profile';

export const ProductsList: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelectors.get);
  const isAdmin: boolean = useSelector(profileSelectors.isAdmin);

  const onChangePage = (page: number, pageSize: number): void => {
    dispatch(
      productsActions.load({
        pagination: {
          pageSize: pageSize,
          pageNumber: page,
        },
        sorting: {
          type: 'ASC',
          field: 'name',
        },
      })
    );
  };

  const onCreate = () => {};

  return (
    <>
      <List
        onChangePage={onChangePage}
        total={products.total}
        products={products.data}
        canEdit={isAdmin}
        canDelete={isAdmin}
      />
    </>
  );
};
