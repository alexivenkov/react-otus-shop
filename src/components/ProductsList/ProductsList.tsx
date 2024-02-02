import React, { FC, memo } from 'react';
import { Product as ProductModel } from '@/models/product';
import { Empty, List } from 'antd';
import { ProductShort } from '@/components/ProductShort/ProductShort';

interface ProductListProps {
  products: ProductModel[];
  onChangePage: (page: number, pageSize: number) => void;
  onEdit: (e: React.MouseEvent<HTMLElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
  total: number;
  canEdit: boolean;
  canDelete: boolean;
}

export const ProductsList: FC<ProductListProps> = memo((props: ProductListProps) => {
  return (
    <>
      {!props.total && <Empty description={''} />}
      {props.products.length > 0 && (
        <List
          grid={{ gutter: 16, column: props.products.length < 5 ? props.products.length : 4 }}
          dataSource={props.products}
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
          renderItem={(item) => (
            <List.Item>
              <ProductShort
                product={item}
                canEdit={props.canEdit}
                canDelete={props.canDelete}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
              />
            </List.Item>
          )}
        ></List>
      )}
    </>
  );
});

ProductsList.displayName = 'ProductsList';
