import React, { createContext, SetStateAction, useState } from 'react';
import './localization';
import './styles/index.sass';
import { Navigation } from '@/navigation/Navigation';
import { LOCALE_KEY, storage } from '@/utils/storage';
import { Locale, Localization } from '@/localization/Localization';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelectors } from '@/store/slices/auth';
import { cartSelectors } from '@/store/slices/cart';

export interface AppContext {
  locale: Locale;
  localeSetter: React.Dispatch<SetStateAction<string>>;
  token: string;
  onSignOut: () => void;
  cartTotal: number;
}

const getLocale = (): Locale => {
  const locale = storage.get(LOCALE_KEY) as Locale;

  if (!locale || !Object.values(Locale).includes(locale)) {
    return Locale.en;
  }

  return locale;
};

export const Context = createContext<AppContext>(null);

function App() {
  const [locale, setLocale] = useState<Locale>(getLocale());
  const token = useSelector(authSelectors.token);
  const dispatch = useDispatch();
  const cartTotal = useSelector(cartSelectors.total);

  const onSignOut = () => {
    dispatch(authActions.signOut());
  };

  return (
    <Context.Provider
      value={{ locale: locale, localeSetter: setLocale, token: token, onSignOut: onSignOut, cartTotal: cartTotal }}
    >
      <Localization />
      <Navigation />
    </Context.Provider>
  );
}

export default App;
