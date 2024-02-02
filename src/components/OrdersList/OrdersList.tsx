import React, { FC } from 'react';
import { Order, OrderProduct } from '@/models/order';
import { Avatar, List, Space } from 'antd';
import cn from 'clsx';
import s from './OrderList.sass';

interface OrdersListProps {
  orders: Order[];
  onChangePage: (page: number, pageSize: number) => void;
  total: number;
}

const getOrderContent = (order: Order) => {
  return order.products.map((item: OrderProduct) => {
    return (
      <div key={item.product.id} className={cn(s.productRow)}>
        <Space>
          <Avatar src={item.product.photo} />
          {item.product.name}
        </Space>
      </div>
    );
  });
};

const getOrderTotalPrice = (order: Order): number => {
  return order.products
    .map((item: OrderProduct) => {
      return item.product.price * item.quantity;
    })
    .reduce((totalSum: number, productSum: number) => totalSum + productSum);
};

export const OrdersList: FC<OrdersListProps> = (props: OrdersListProps) => {
  return (
    <>
      <List
        dataSource={props.orders}
        pagination={
          props.total < 8
            ? false
            : {
                position: 'bottom',
                align: 'center',
                onChange: props.onChangePage,
                pageSize: 8,
                total: props.total,
              }
        }
        renderItem={(item: Order) => (
          <List.Item>
            <List.Item.Meta title={item.status.toUpperCase()} description={<div>{getOrderContent(item)}</div>} />
            <div>${getOrderTotalPrice(item)}</div>
          </List.Item>
        )}
      />
    </>
  );
};
