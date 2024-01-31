import React, { FC, memo, ReactNode } from 'react';
import { Card, Button, Typography } from 'antd';
import cn from 'clsx';
import s from './Category.sass';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Category as CategoryModel } from '@/models/category';
import { Link } from 'react-router-dom';
import { CoverImage } from '@/components/CoverImage/CoverImage';

const { Meta } = Card;
const { Text } = Typography;

interface CategoryProps {
  category?: CategoryModel;
  canEdit: boolean;
  canDelete: boolean;
  onEdit?: (e: React.MouseEvent<HTMLElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Category: FC<CategoryProps> = memo((props: CategoryProps) => {
  const actions: ReactNode[] = [];

  if (props.canEdit) {
    actions.push(
      <Button key={`edit.${props.category?.id}`} onClick={props.onEdit} type={'text'} data-id={props.category?.id}>
        <EditOutlined />
      </Button>
    );
  }

  if (props.canDelete) {
    actions.push(
      <Button key={`delete.${props.category?.id}`} onClick={props.onDelete} type={'text'} data-id={props.category?.id}>
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
            <Link to={`/categories/${props.category.id}/products`}>
              <CoverImage src={props.category.photo} />
            </Link>
          </>
        }
        actions={actions}
        className={cn(s.category)}
      >
        <Meta
          title={
            <>
              <Text className={cn(s.categoryTitle)}>{props.category?.name}</Text>
            </>
          }
        />
      </Card>
    </>
  );
});

Category.displayName = 'Category';
