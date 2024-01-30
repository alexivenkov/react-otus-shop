import React, { FC, useState } from 'react';
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
import { Category } from '@/models/category';

export const ProductsList: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelectors.get);
  const isAdmin: boolean = useSelector(profileSelectors.isAdmin);
  const categories = useSelector(categoriesSelectors.categories);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(null);
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
      })
    );
  };

  const onCloseModal = () => {
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
    console.log(data);
  };

  return (
    <>
      <Space direction={'vertical'}>
        {isAdmin && <Button onClick={() => setShowModal(true)}>{t('forms.product.create')}</Button>}
        <List
          onChangePage={onChangePage}
          onEdit={onEdit}
          total={products.total}
          products={products.data}
          canEdit={isAdmin}
          canDelete={isAdmin}
        />
        <Modal width={'35%'} open={showModal} footer={false} onCancel={onCloseModal}>
          <h2 className={cn(s.authLabel)}>{t(`forms.product.${currentProduct ? 'update' : 'create'}`)}</h2>
          <ProductForm product={currentProduct} categories={categories} onSubmit={onSave} />
        </Modal>
      </Space>
    </>
  );
};
