import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { Home } from '@/screens/Home/Home';

export const Navigation: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};
