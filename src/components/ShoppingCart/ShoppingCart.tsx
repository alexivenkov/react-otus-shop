import React, { FC } from 'react';
import { OrderProduct } from '@/models/order';
import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

interface ShoppingCartProps {
  onCheckOut: () => void;
  cart: OrderProduct[];
  sum: number;
}

export const ShoppingCart: FC<ShoppingCartProps> = (props: ShoppingCartProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col span={14}>
          <List
            dataSource={props.cart}
            renderItem={(item: OrderProduct) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.product.photo} />}
                  title={item.product.name}
                  description={item.product.desc}
                />
                <div>
                  ${item.product.price} x {item.quantity}
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={8}>
          <Card title={`${t('cart.total')}: $${props.sum}`}>
            <Button disabled={!props.sum} type={'primary'} onClick={props.onCheckOut}>
              {t('cart.checkOut')}
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};
