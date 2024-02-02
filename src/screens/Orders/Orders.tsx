import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ordersActions, ordersSelectors } from '@/store/slices/orders';
import { OrdersList } from '@/components/OrdersList/OrdersList';

export const Orders: FC = () => {
  const orders = useSelector(ordersSelectors.get);
  const dispatch = useDispatch();

  const onChangePage = (page: number, pageSize: number) => {
    dispatch(
      ordersActions.load({
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
      <OrdersList orders={orders.data} total={orders.total} onChangePage={onChangePage} />
    </>
  );
};
