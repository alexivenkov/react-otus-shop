import React, { createContext } from 'react';
import './styles/index.sass';
import { Navigation } from '@/navigation/Navigation';

export interface AppContext {}

export const Context = createContext<AppContext>(null);

function App() {
  return (
    <Context.Provider value={{}}>
      <Navigation />
    </Context.Provider>
  );
}

export default App;
