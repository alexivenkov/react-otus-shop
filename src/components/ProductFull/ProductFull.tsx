import React, { FC } from 'react';
import { Card, Col, Row, Typography, Space, Divider, Button } from 'antd';
import { Product } from '@/models/product';
import cn from 'clsx';
import s from './ProductFull.sass';
import { useTranslation } from 'react-i18next';
import { CoverImage } from '@/components/CoverImage/CoverImage';
import { CounterCart } from '@/components/CounterCart/CounterCart';

const { Title, Text } = Typography;

interface ProductFullProps {
  product: Product;
  count: number;
  add: (product: Product) => void;
  remove: (product: Product) => void;
}

export const ProductFull: FC<ProductFullProps> = (props: ProductFullProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Card loading={props.product == null}>
        <Row>
          <Col span={8}>
            <CoverImage src={props.product?.photo} />
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24}>
                <Title>{props.product?.name}</Title>
                <Space>
                  <Text className={cn(s.priceLabel)}>{t('forms.product.price')}:</Text>
                  {props.product?.oldPrice && (
                    <Text className={cn(s.priceValue)} delete={true} type={'secondary'}>
                      ${props.product?.oldPrice}
                    </Text>
                  )}
                  <Text className={cn(s.priceValue)}>${props.product?.price}</Text>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Divider />
                <Title level={4}>{t('forms.product.description')}:</Title>
                <Text>{props.product?.desc}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Divider />
                <CounterCart product={props.product} count={props.count} add={props.add} remove={props.remove} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};
