import React, { FC, memo, useContext } from 'react';
import { Menu as MenuWrapper } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cn from 'clsx';
import s from './Menu.sass';
import { AppContext, Context } from '@/App';

export const Menu: FC = memo(() => {
  const { t } = useTranslation();
  const context: AppContext = useContext<AppContext>(Context);

  let menu = [
    {
      key: 1,
      label: <Link to={'/'}>{t('menu.home')}</Link>,
    },
  ];

  const protectedMenu = [
    {
      key: 2,
      label: <Link to={'/profile'}>{t('menu.profile')}</Link>,
    },
    {
      key: 3,
      label: <Link to={'/categories'}>{t('menu.categories')}</Link>,
    },
  ];

  if (context.token) {
    menu = menu.concat(protectedMenu);
  }

  return <MenuWrapper className={cn(s.menu)} mode={'horizontal'} items={menu} />;
});

Menu.displayName = 'Menu';
