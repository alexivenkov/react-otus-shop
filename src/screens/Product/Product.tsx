import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, getAuthHeader } from '@/utils/api';
import { Product as ProductModel } from '@/models/product';
import { ProductFull } from '@/components/ProductFull/ProductFull';
import { NotFoundError, ServerError } from '@/utils/api/errors';
import { useNotification } from '@/hooks/useNotification';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, cartSelectors } from '@/store/slices/cart';
import { OrderProduct } from '@/models/order';

export const Product: FC = () => {
  const [product, setProduct] = useState<ProductModel>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const { productId } = useParams<string>();
  const { showError } = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector(cartSelectors.products);

  const addToCart = (product: ProductModel) => dispatch(cartActions.add(product));
  const removeFromCart = (product: ProductModel) => dispatch(cartActions.remove(product));

  useEffect(() => {
    (async () => {
      try {
        const response: ProductModel = await api.get<ProductModel>(`products/${productId}`, {}, { ...getAuthHeader() });
        setProduct(response);

        if (cartProducts) {
          setCartCount(
            cartProducts.filter((item: OrderProduct) => item.product.id == productId).shift()?.quantity ?? 0
          );
        }
      } catch (e) {
        console.error(e);

        switch (true) {
          case e instanceof NotFoundError:
            showError(e);
            navigate('/products');
            break;
          case e instanceof ServerError:
            showError(e);
            navigate('/');
            break;
          default:
            navigate('/');
        }
      }
    })();
  }, [productId]);

  return (
    <>
      <ProductFull product={product} add={addToCart} remove={removeFromCart} count={cartCount} />
    </>
  );
};
