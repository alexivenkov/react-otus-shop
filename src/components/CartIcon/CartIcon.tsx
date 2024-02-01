import React, { FC, memo, useContext } from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import cn from 'clsx';
import s from './CartIcon.sass';
import { AppContext, Context } from '@/App';

export const CartIcon: FC = memo(() => {
  const context: AppContext = useContext<AppContext>(Context);

  return (
    <>
      {context.token && (
        <Badge count={context.cartTotal}>
          <ShoppingCartOutlined className={cn(s.iconCart)} />
        </Badge>
      )}
    </>
  );
});

CartIcon.displayName = 'CartIcon';
