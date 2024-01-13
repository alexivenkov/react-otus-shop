import React, { FC, useContext } from 'react';
import { Layout, Space } from 'antd';
import { Menu } from '@/components/HeaderContainer/Menu/Menu';
import cn from 'clsx';
import s from './Header.sass';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Auth } from '@/components/HeaderContainer/Auth/Auth';
import { AppContext, Context } from '@/App';

const { Header } = Layout;

export const HeaderContainer: FC = () => {
  const context: AppContext = useContext<AppContext>(Context);

  return (
    <Header className={cn(s.header)}>
      <div className={cn(s.headerContent)}>
        <div>Logo</div>
        <Menu />
        <Space>
          <Auth token={context.token} />
          <LocaleSwitcher />
        </Space>
      </div>
    </Header>
  );
};
