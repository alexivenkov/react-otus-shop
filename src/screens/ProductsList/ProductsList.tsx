import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, productsSelectors } from '@/store/slices/products';
import { ProductsList as List } from '@/components/ProductsList/ProductsList';
import { profileSelectors } from '@/store/slices/profile';
import { Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Product } from '@/models/product';
import { Product as ProductForm } from '@/components/Forms/Product/Product';
import cn from 'clsx';
import s from '@/screens/Auth/Auth.sass';
import { ProductInputs } from '@/components/Forms/Product/types';
import { categoriesSelectors } from '@/store/slices/categories';
import { useNotification } from '@/hooks/useNotification';
import { Status } from '@/store/states';
import { useParams } from 'react-router-dom';

export const ProductsList: FC = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(productsSelectors.get);
  const isAdmin: boolean = useSelector(profileSelectors.isAdmin);
  const categories = useSelector(categoriesSelectors.categories);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(null);
  const { showSuccess, showError } = useNotification();
  const { t } = useTranslation();

  const onChangePage = (page: number, pageSize: number): void => {
    dispatch(
      productsActions.load({
        pagination: {
          pageSize: pageSize,
          pageNumber: page,
        },
        sorting: {
          type: 'ASC',
          field: 'name',
        },
        categories: [categoryId],
      })
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const onEdit = (e: React.MouseEvent<HTMLElement>) => {
    const productId = e.currentTarget.dataset['id'];
    const product: Product = products.data
      .filter((product) => {
        return product.id == productId;
      })
      .shift();

    setCurrentProduct(product);
    setShowModal(true);
  };

  const onSave = (data: ProductInputs) => {
    dispatch(
      currentProduct
        ? productsActions.edit({
            id: currentProduct.id,
            ...data,
          })
        : productsActions.create({
            ...data,
          })
    );

    closeModal();
  };

  const onDelete = (e: React.MouseEvent<HTMLElement>) => {
    const productId = e.currentTarget.dataset['id'];

    dispatch(productsActions.delete({ id: productId }));
  };

  useEffect(() => {
    if (products.status == Status.succeeded) {
      showSuccess('success');
      dispatch(
        productsActions.setMeta({
          status: Status.idle,
        })
      );
    }

    if (products.status == Status.failed) {
      showError(products.error);
      dispatch(
        productsActions.setMeta({
          status: Status.idle,
        })
      );
    }
  }, [products.status]);

  useEffect(() => {
    dispatch(
      productsActions.load({
        pagination: { pageNumber: 1, pageSize: 8 },
        sorting: { type: 'ASC', field: 'name' },
        categories: [categoryId],
      })
    );
  }, []);

  return (
    <>
      <Space direction={'vertical'}>
        {isAdmin && <Button onClick={() => setShowModal(true)}>{t('forms.product.create')}</Button>}
        <List
          onChangePage={onChangePage}
          onEdit={onEdit}
          onDelete={onDelete}
          total={products.total}
          products={products.data}
          canEdit={isAdmin}
          canDelete={isAdmin}
        />
        <Modal width={'35%'} open={showModal} footer={false} onCancel={closeModal}>
          <h2 className={cn(s.authLabel)}>{t(`forms.product.${currentProduct ? 'update' : 'create'}`)}</h2>
          <ProductForm product={currentProduct} categories={categories} onSubmit={onSave} />
        </Modal>
      </Space>
    </>
  );
};
