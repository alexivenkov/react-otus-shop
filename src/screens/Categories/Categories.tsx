import React, { FC, useEffect, useState } from 'react';
import { CategoryList } from '@/components/CategoryList/CategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesActions, categoriesSelectors } from '@/store/slices/categories';
import { profileSelectors } from '@/store/slices/profile';
import { Button, Modal, Space } from 'antd';
import { Category as CategoryForm } from '@/components/Forms/Category/Category';
import { CategoryInputs } from '@/components/Forms/Category/types';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import s from '@/screens/Auth/Auth.sass';
import { Category } from '@/models/category';
import { Status } from '@/store/states';
import { useNotification } from '@/hooks/useNotification';

export const Categories: FC = () => {
  const categories = useSelector(categoriesSelectors.get);

  const dispatch = useDispatch();
  const total = useSelector(categoriesSelectors.total);
  const canCreateCategory = useSelector(profileSelectors.isAdmin);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<Category>(null);
  const { showSuccess, showError } = useNotification();
  const { t } = useTranslation();

  const onChangePage = (page: number, pageSize: number) => {
    dispatch(
      categoriesActions.load({
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

  const closeModal = () => {
    setCurrentCategory(null);
    setShowModal(false);
  };

  const onSave = (data: CategoryInputs) => {
    dispatch(
      currentCategory
        ? categoriesActions.edit({
            id: currentCategory.id,
            name: data.name,
            photo: data.photo,
          })
        : categoriesActions.create({
            name: data.name,
            photo: data.photo,
          })
    );

    closeModal();
  };

  const onDelete = (e: React.MouseEvent<HTMLElement>) => {
    const categoryId = e.currentTarget.dataset['id'];

    dispatch(categoriesActions.delete({ id: categoryId }));
  };

  const onEdit = (e: React.MouseEvent<HTMLElement>) => {
    const categoryId = e.currentTarget.dataset['id'];
    const category: Category = categories.data
      .filter((category) => {
        return category.id == categoryId;
      })
      .shift();

    setCurrentCategory(category);
    setShowModal(true);
  };

  useEffect(() => {
    if (categories.status == Status.succeeded) {
      showSuccess('success');
    }

    if (categories.status == Status.failed) {
      showError(categories.error);
    }
  }, [categories.status]);

  return (
    <>
      <Space direction={'vertical'}>
        {canCreateCategory && <Button onClick={() => setShowModal(true)}>{t('forms.category.create')}</Button>}
        <CategoryList
          categories={categories.data}
          total={total}
          onChangePage={onChangePage}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <Modal open={showModal} footer={false} onCancel={closeModal}>
          <h2 className={cn(s.authLabel)}>{t(`forms.category.${currentCategory ? 'update' : 'create'}`)}</h2>
          <CategoryForm category={currentCategory} onSubmit={onSave} />
        </Modal>
      </Space>
    </>
  );
};
