import React, { FC, memo } from 'react';
import { Category as CategoryModel } from '@/models/category';
import { Empty, List } from 'antd';
import { Category } from '@/components/Category/Category';

interface CategoryListProps {
  categories: CategoryModel[];
  total: number;
  canEdit: boolean;
  canDelete: boolean;
  onChangePage: (page: number, pageSize: number) => void;
  onEdit: (e: React.MouseEvent<HTMLElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
}

export const CategoryList: FC<CategoryListProps> = memo((props: CategoryListProps) => {
  return (
    <>
      {!props.categories.length && <Empty description={''} />}
      {props.categories.length > 0 && (
        <List
          grid={{ gutter: 16, column: props.categories.length < 5 ? props.categories.length : 4 }}
          dataSource={props.categories}
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
              <Category
                category={item}
                canEdit={props.canEdit}
                canDelete={props.canDelete}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
});

CategoryList.displayName = 'CategoryList';
