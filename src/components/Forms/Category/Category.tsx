import React, { FC } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { CategoryInputs } from '@/components/Forms/Category/types';
import cn from 'clsx';
import s from './Category.sass';
import { Button, Form, Input, Typography } from 'antd';
import { Category as CategoryModel } from '@/models/category';
import { UploadPhotoInput } from '@/components/Forms/Common/UploadPhotoInput/UploadPhotoInput';

const { Text } = Typography;

interface CategoryProps {
  category: CategoryModel;
  onSubmit: (data: CategoryInputs) => void;
}

const validationSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const validExtensions = ['image/png', 'image/jpeg', 'image'];

export const Category: FC<CategoryProps> = (props: CategoryProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryInputs>({
    values: {
      name: props.category?.name || null,
      photo: props.category?.photo || null,
    },
    resolver: yupResolver(validationSchema),
  });

  const { t } = useTranslation();

  return (
    <>
      <Form onFinish={handleSubmit(props.onSubmit)} name={'category'} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.category.name')}>
              <Input required {...field} />
              {errors.name && <Text type={'danger'}>{errors.name.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="photo"
          control={control}
          render={({ field }) => <UploadPhotoInput field={field} error={errors.photo} urlSetter={setValue} />}
        />
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t(`forms.category.save`)}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
