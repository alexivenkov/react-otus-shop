import React, { FC } from 'react';
import { CategoryList } from '@/components/CategoryList/CategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesActions, categoriesSelectors } from '@/store/slices/categories';

export const Categories: FC = () => {
  const categories = useSelector(categoriesSelectors.categories);
  const dispatch = useDispatch();
  const total = useSelector(categoriesSelectors.total);

  const onChangePage = (page: number, pageSize: number) => {
    dispatch(
      categoriesActions.load({
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

  return (
    <>
      <CategoryList categories={categories} total={total} onChangePage={onChangePage} />
    </>
  );
};
