import React, { FC, useContext } from 'react';
import { AppContext, Context } from '@/App';
import { Select } from 'antd';
import { Locale } from '@/localization/Localization';
import { LOCALE_KEY, storage } from '@/utils/storage';

export const LocaleSwitcher: FC = () => {
  const context: AppContext = useContext<AppContext>(Context);

  const changeLocale = (value: Locale) => {
    context.localeSetter(value);
    storage.set(LOCALE_KEY, value);
  };

  return (
    <Select
      defaultValue={context.locale}
      onChange={changeLocale}
      options={[
        { value: 'en', label: 'EN' },
        { value: 'ru', label: 'RU' },
      ]}
    />
  );
};
