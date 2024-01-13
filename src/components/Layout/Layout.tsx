import React, { FC, memo } from 'react';
import { Layout as LayoutWrapper } from 'antd';
import { HeaderContainer } from '@/components/HeaderContainer/Header';
import cn from 'clsx';
import s from './Layout.sass';

const { Content, Footer } = LayoutWrapper;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<AppLayoutProps> = memo<AppLayoutProps>(({ children }: AppLayoutProps) => {
  return (
    <LayoutWrapper className={cn(s.layout)}>
      {<HeaderContainer />}
      <Content className={cn(s.content)}>{children}</Content>
      <Footer className={cn(s.footer)}>eShop ©{new Date().getFullYear()}, by aleksandr.ivenkov@gmail.com</Footer>
    </LayoutWrapper>
  );
});

Layout.displayName = 'Layout';
