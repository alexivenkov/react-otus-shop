import React, { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { CategoryInputs } from '@/components/Forms/Category/types';
import { UploadOutlined } from '@ant-design/icons';
import cn from 'clsx';
import s from './Category.sass';
import { Button, Form, Input, Space, Typography, Upload, UploadProps } from 'antd';
import { apiPath, apiUrl, getAuthHeader } from '@/utils/api';
import { useNotification } from '@/hooks/useNotification';
import { Category as CategoryModel } from '@/models/category';

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
  const { showSuccess, showWarning } = useNotification();

  const uploadParams: UploadProps = {
    name: 'file',
    action: `${apiUrl}${apiPath}/upload`,
    headers: {
      ...getAuthHeader(),
    },
    showUploadList: false,
    beforeUpload: (file) => {
      const granted = validExtensions.includes(file.type);

      if (!granted) {
        showWarning(`${file.type} ${t('forms.category.upload.invalid')}`);
      }

      return granted;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        showSuccess(t('forms.category.upload.success'));
        setValue('photo', info.file.response.url);
      }
    },
  };

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
          render={({ field }) => (
            <Form.Item label={t('forms.category.photo')}>
              <Space.Compact className={cn(s.uploadContainer)}>
                <Input {...field} />
                <Upload {...uploadParams}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Space.Compact>
              {errors.photo && <Text type={'danger'}>{errors.photo.message}</Text>}
            </Form.Item>
          )}
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
