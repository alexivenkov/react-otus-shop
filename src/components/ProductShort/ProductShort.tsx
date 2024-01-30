import React, { FC, memo } from 'react';
import { Product } from '@/models/product';
import { Button, Card, Popover, Space, Typography } from 'antd';
import cn from 'clsx';
import s from './ProductShort.sass';
import { useTranslation } from 'react-i18next';
import { CoverImage } from '@/components/CoverImage/CoverImage';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { authSelectors } from '@/store/slices/auth';

const { Meta } = Card;
const { Text } = Typography;

interface ProductShortProps {
  product: Product;
  canEdit: boolean;
  canDelete: boolean;
}

export const ProductShort: FC<ProductShortProps> = memo((props: ProductShortProps) => {
  const { t } = useTranslation();
  const token = useSelector(authSelectors.token);

  const actions: React.ReactNode[] = [];

  if (props.canEdit) {
    actions.push(
      <Button key={`edit.${props.product.id}`}>
        <EditOutlined />
      </Button>
    );
  }

  if (props.canDelete) {
    actions.push(
      <Button key={`delete.${props.product.id}`}>
        <DeleteOutlined />
      </Button>
    );
  }

  return (
    <>
      <Card
        hoverable
        cover={
          <>
            <Popover placement={'topLeft'} title={props.product.category?.name}>
              <CoverImage src={props.product?.photo} />
            </Popover>
          </>
        }
        actions={token ? actions : []}
        className={cn(s.productShort)}
      >
        <Meta
          title={props.product.name}
          description={
            <>
              <Space>
                {props.product.oldPrice && (
                  <Text delete={true} type={'secondary'} className={cn(s.price)}>
                    ${props.product.oldPrice}
                  </Text>
                )}
                <Text className={cn(s.price)}>${props.product.price}</Text>
                {props.product.oldPrice && (
                  <Text strong={true} type={'danger'}>
                    {t('forms.product.sale')}
                  </Text>
                )}
              </Space>
            </>
          }
        />
      </Card>
    </>
  );
});

ProductShort.displayName = 'ProductShort';
