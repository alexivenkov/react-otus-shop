import React, { FC } from 'react';
import { Layout } from 'antd';
import { Menu } from '@/components/HeaderContainer/Menu/Menu';
import cn from 'clsx';
import s from './Header.sass';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';

const { Header } = Layout;

export const HeaderContainer: FC = () => {
  return (
    <Header className={cn(s.header)}>
      <div className={cn(s.headerContent)}>
        <div>Logo</div>
        <Menu />
        <span>
          <LocaleSwitcher />
        </span>
      </div>
    </Header>
  );
};
