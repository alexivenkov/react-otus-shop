import React, { FC, memo } from 'react';
import { Category as CategoryModel } from '@/models/category';
import { Empty, List } from 'antd';
import { Category } from '@/components/Category/Category';
import { Pagination } from '@/utils/api/responses';

interface CategoryListProps {
  categories: CategoryModel[];
  total: number;
  onChangePage: (page: number, pageSize: number) => void;
}

export const CategoryList: FC<CategoryListProps> = memo((props: CategoryListProps) => {
  return (
    <>
      {!props.categories.length && <Empty description={''} />}
      {props.categories.length > 0 && (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={props.categories}
          pagination={{
            position: 'bottom',
            align: 'center',
            onChange: props.onChangePage,
            pageSize: 8,
            total: props.total,
          }}
          renderItem={(item) => (
            <List.Item>
              <Category name={item.name} photo={item.photo} />
            </List.Item>
          )}
        />
      )}
    </>
  );
});

CategoryList.displayName = 'CategoryList';
