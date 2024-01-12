import React, { createContext, SetStateAction, useState } from 'react';
import './localization';
import './styles/index.sass';
import { Navigation } from '@/navigation/Navigation';
import { LOCALE_KEY, storage } from '@/utils/storage';
import { Locale, Localization } from '@/localization/Localization';

export interface AppContext {
  locale: Locale;
  localeSetter: React.Dispatch<SetStateAction<string>>;
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

  return (
    <Context.Provider value={{ locale: locale, localeSetter: setLocale }}>
      <Localization />
      <Navigation />
    </Context.Provider>
  );
}

export default App;
