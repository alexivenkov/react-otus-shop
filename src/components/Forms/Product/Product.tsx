import React, { FC } from 'react';
import { Product as ProductModel } from '@/models/product';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductInputs } from '@/components/Forms/Product/types';
import { AutoComplete, Button, Form, Input, Select, Space, Typography, Upload, UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { Category } from '@/models/category';
import cn from 'clsx';
import s from '@/components/Forms/Category/Category.sass';
import { UploadOutlined } from '@ant-design/icons';
import { apiPath, apiUrl, getAuthHeader } from '@/utils/api';

const { Text } = Typography;

interface ProductProps {
  product: ProductModel;
  categories: Category[];
  onSubmit: (data: ProductInputs) => void;
}

export const Product: FC<ProductProps> = (props: ProductProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductInputs>({
    /*values: {
      name: props.product?.name || null,
    },*/
  });

  const { t } = useTranslation();
  const categories = props.categories.map((category: Category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });

  /*const uploadParams: UploadProps = {
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
  };*/

  return (
    <>
      <Form onFinish={handleSubmit(props.onSubmit)} name={'product'} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.name')}>
              <Input required {...field} />
              {errors.name && <Text type={'danger'}>{errors.name.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="desc"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.desc')}>
              <Input required {...field} />
              {errors.desc && <Text type={'danger'}>{errors.desc.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.category')}>
              <Select value={props.product?.category?.id} options={categories} {...field} />
              {errors.desc && <Text type={'danger'}>{errors.desc.message}</Text>}
            </Form.Item>
          )}
        ></Controller>
        <Controller
          name="oldPrice"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.oldPrice')}>
              <Input required {...field} />
              {errors.desc && <Text type={'danger'}>{errors.desc.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.price')}>
              <Input required {...field} />
              {errors.desc && <Text type={'danger'}>{errors.desc.message}</Text>}
            </Form.Item>
          )}
        />
        {/*<Controller
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
        />*/}
      </Form>
    </>
  );
};
