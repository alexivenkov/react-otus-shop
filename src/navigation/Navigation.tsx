import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { Home } from '@/screens/Home/Home';
import { Auth } from '@/screens/Auth/Auth';
import { AuthType } from '@/components/Forms/Auth/types';
import { Initialization } from '@/screens/Initialization/Initialization';
import { useSelector } from 'react-redux';
import { initSelectors } from '@/store/slices/init';
import { Status } from '@/store/states';

export const Navigation: FC = () => {
  const init = useSelector(initSelectors.get);

  return (
    <>
      <BrowserRouter>
        {init.status != Status.succeeded && <Initialization />}
        {init.status == Status.succeeded && (
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path={'/profile'} element={<Home />} />
              <Route path={'/categories'} element={<Home />} />
              <Route path={'/sign-in'} element={<Auth type={AuthType.signIn} />} />
              <Route path={'/sign-up'} element={<Auth type={AuthType.signUp} />} />
            </Routes>
          </Layout>
        )}
      </BrowserRouter>
    </>
  );
};
