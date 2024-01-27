import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, getAuthHeader } from '@/utils/api';
import { Product as ProductModel } from '@/models/product';
import { ProductFull } from '@/components/ProductFull/ProductFull';
import { NotFoundError, ServerError } from '@/utils/api/errors';
import { useNotification } from '@/hooks/useNotification';

export const Product: FC = () => {
  const [product, setProduct] = useState<ProductModel>(null);
  const { productId } = useParams<string>();
  const { showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response: ProductModel = await api.get<ProductModel>(`products/${productId}`, {}, {});

        setProduct(response);
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
      <ProductFull product={product} />
    </>
  );
};
