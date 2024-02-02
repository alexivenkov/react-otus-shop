import React, { FC } from 'react';
import { Product as ProductModel } from '@/models/product';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductInputs } from '@/components/Forms/Product/types';
import { Button, Form, Input, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Category } from '@/models/category';
import { UploadPhotoInput } from '@/components/Forms/Common/UploadPhotoInput/UploadPhotoInput';
import * as yup from 'yup';

const { Text } = Typography;

interface ProductProps {
  product: ProductModel;
  categories: Category[];
  onSubmit: (data: ProductInputs) => void;
}

export const Product: FC<ProductProps> = (props: ProductProps) => {
  const { t } = useTranslation();

  const categories = props.categories.map((category: Category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });

  const validationSchema = yup.object({
    name: yup.string().required(),
    desc: yup.string().optional(),
    photo: yup.string().optional(),
    oldPrice: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .optional(),
    price: yup
      .number()
      .required()
      .when('oldPrice', (oldPrice, schema) => {
        return oldPrice.pop() ? schema.lessThan(yup.ref('oldPrice'), t('forms.product.validation.price')) : schema;
      }),
    category: yup
      .string()
      .oneOf(categories.map((category) => category.value))
      .required(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductInputs>({
    values: {
      name: props.product?.name,
      desc: props.product?.desc,
      photo: props.product?.photo,
      price: props.product?.price,
      oldPrice: props.product?.oldPrice,
      category: props.product?.category?.id,
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <Form onFinish={handleSubmit(props.onSubmit)} name={'product'} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.name')}>
              <Input {...field} />
              {errors.name && <Text type={'danger'}>{errors.name.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="desc"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.desc')}>
              <Input {...field} />
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
              {errors.category && <Text type={'danger'}>{errors.category.message}</Text>}
            </Form.Item>
          )}
        ></Controller>
        <Controller
          name="oldPrice"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.oldPrice')}>
              <Input {...field} />
              {errors.oldPrice && <Text type={'danger'}>{errors.oldPrice.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.product.price')}>
              <Input {...field} />
              {errors.price && <Text type={'danger'}>{errors.price.message}</Text>}
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
            {t(`forms.product.save`)}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
