import React, { FC, memo } from 'react';
import { Menu as MenuWrapper } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cn from 'clsx';
import s from './Menu.sass';

export const Menu: FC = memo(() => {
  const { t } = useTranslation();

  const menu = [
    {
      key: 1,
      label: <Link to={'/profile'}>{t('menu.profile')}</Link>,
    },
    {
      key: 2,
      label: <Link to={'/categories'}>{t('menu.categories')}</Link>,
    },
  ];

  return <MenuWrapper className={cn(s.menu)} mode={'horizontal'} items={menu} />;
});

Menu.displayName = 'Menu';
