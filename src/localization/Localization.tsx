import { FC, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, Context } from '../App';

export enum Locale {
  en = 'en',
  ru = 'ru',
}

export const Localization: FC = () => {
  const { i18n } = useTranslation();
  const context: AppContext = useContext<AppContext>(Context);

  useEffect(() => {
    i18n.changeLanguage(context.locale);
  }, [context, i18n]);

  return null;
};
