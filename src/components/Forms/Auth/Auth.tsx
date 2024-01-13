import React, { FC } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'clsx';
import s from './Auth.sass';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AuthInputs, AuthType } from '@/components/Forms/Auth/types';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

interface AuthProps {
  type: AuthType;
  onSubmit?: (data: AuthInputs) => void;
  loading: boolean;
}

const onSubmit: SubmitHandler<AuthInputs> = (data) => {
  console.log(data);
};

const validationSchema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(7),
  })
  .required();

export const Auth: FC<AuthProps> = (props: AuthProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>({
    resolver: yupResolver(validationSchema),
  });

  const { t } = useTranslation();

  return (
    <>
      <Form
        onFinish={handleSubmit(props.onSubmit ? props.onSubmit : onSubmit)}
        name={'auth'}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        className={cn(s.authForm)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item label={'email'}>
              <Input {...field} />
              {errors.email && <Text type={'danger'}>{errors.email.message}</Text>}
            </Form.Item>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Form.Item label={'password'}>
              <Input.Password {...field} />
              {errors.password && <Text type={'danger'}>{errors.password.message}</Text>}
            </Form.Item>
          )}
        />

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={props.loading}>
            {t(`forms.auth.${props.type}`)}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
