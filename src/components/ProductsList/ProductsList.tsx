import React, { FC, memo } from 'react';
import { Product as ProductModel } from '@/models/product';
import { Empty, List } from 'antd';
import { ProductShort } from '@/components/ProductShort/ProductShort';
import { Link } from 'react-router-dom';

interface ProductListProps {
  products: ProductModel[];
  onChangePage: (page: number, pageSize: number) => void;
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
          grid={{ gutter: 16, column: props.total < 5 ? props.total : 4 }}
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
              <Link to={`/products/${item.id}`}>
                <ProductShort product={item} canEdit={props.canEdit} canDelete={props.canDelete} />
              </Link>
            </List.Item>
          )}
        ></List>
      )}
    </>
  );
});

ProductsList.displayName = 'ProductsList';
