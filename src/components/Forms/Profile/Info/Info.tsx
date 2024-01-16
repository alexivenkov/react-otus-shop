import React, { FC, useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileInfoInputs } from '@/components/Forms/Profile/types';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface InfoProps {
  email: string;
  name: string;
  loading: boolean;
  onSubmit: (data: ProfileInfoInputs) => void;
}

const validationSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export const Info: FC<InfoProps> = (props: InfoProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInfoInputs>({
    values: {
      email: props.email,
      name: props.name,
    },
    resolver: yupResolver(validationSchema),
  });

  const { t } = useTranslation();

  return (
    <>
      <Form
        onFinish={handleSubmit(props.onSubmit)}
        name={'profileInfo'}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Controller
          name="email"
          control={control}
          disabled={true}
          render={({ field }) => (
            <Form.Item label={t('forms.profile.email')}>
              <Input {...field} />
              {errors.email && <Text type={'danger'}>{errors.email.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.profile.name')}>
              <Input {...field} />
              {errors.name && <Text type={'danger'}>{errors.name.message}</Text>}
            </Form.Item>
          )}
        />
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={props.loading}>
            {t(`forms.profile.save`)}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
