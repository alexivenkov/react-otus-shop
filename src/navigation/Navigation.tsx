import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { Home } from '@/screens/Home/Home';
import { Auth } from '@/screens/Auth/Auth';
import { AuthType } from '@/components/Forms/Auth/types';
import { Initialization } from '@/screens/Initialization/Initialization';
import { useSelector } from 'react-redux';
import { initSelectors } from '@/store/slices/init';
import { Status } from '@/store/states';
import { authSelectors } from '@/store/slices/auth';
import { ProtectedRoute } from '@/navigation/ProtectedRoute';
import { Profile } from '@/screens/Profile/Profile';
import { Categories } from '@/screens/Categories/Categories';
import { ProductsList } from '@/screens/ProductsList/ProductsList';
import { Product } from '@/screens/Product/Product';
import { Cart } from '@/screens/Cart/Cart';

export const Navigation: FC = () => {
  const init = useSelector(initSelectors.get);
  const token = useSelector(authSelectors.token);

  return (
    <>
      <BrowserRouter>
        {init.status != Status.succeeded && <Initialization />}
        {init.status == Status.succeeded && (
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route
                path={'/categories'}
                element={
                  <ProtectedRoute condition={!!token} redirectPath={'/sign-in'}>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/categories/:categoryId/products'}
                element={
                  <ProtectedRoute condition={!!token} redirectPath={'/sign-in'}>
                    <ProductsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/products/:productId'}
                element={
                  <ProtectedRoute condition={!!token} redirectPath={'/sign-in'}>
                    <Product />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/cart'}
                element={
                  <ProtectedRoute condition={!!token} redirectPath={'/sign-in'}>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/profile'}
                element={
                  <ProtectedRoute condition={!!token} redirectPath={'/sign-in'}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/sign-in'}
                element={
                  <ProtectedRoute condition={!token} redirectPath={'/profile'}>
                    <Auth type={AuthType.signIn} />
                  </ProtectedRoute>
                }
              />
              <Route
                path={'/sign-up'}
                element={
                  <ProtectedRoute condition={!token} redirectPath={'/profile'}>
                    <Auth type={AuthType.signUp} />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={'404'} />
            </Routes>
          </Layout>
        )}
      </BrowserRouter>
    </>
  );
};
