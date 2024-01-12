import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { Home } from '@/screens/Home/Home';
import { Auth } from '@/screens/Auth/Auth';
import { AuthType } from '@/components/Forms/Auth/types';

export const Navigation: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path={'/sing-in'} element={<Auth type={AuthType.signIn} />} />
            <Route path={'/sing-up'} element={<Auth type={AuthType.signUp} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};
