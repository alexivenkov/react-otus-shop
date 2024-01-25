import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { productsActions } from '@/store/slices/products';

export const Products: FC = () => {
  const dispatch = useDispatch();

  return <>Products</>;
};
