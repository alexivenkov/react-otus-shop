import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Typography } from 'antd';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { ChangePasswordInputs } from '@/components/Forms/Profile/types';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface ChangePasswordProps {
  onSubmit: (data: ChangePasswordInputs) => void;
  loading: boolean;
}

const validationSchema = yup.object({
  password: yup.string().required().min(7),
  newpassword: yup.string().required().min(7),
  repeatpassword: yup.string().oneOf([yup.ref('newpassword')], "Passwords don't match"),
});

export const ChangePassword: FC<ChangePasswordProps> = (props: ChangePasswordProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordInputs>({
    resolver: yupResolver(validationSchema),
  });

  const { t } = useTranslation();

  const onSubmit = (data: ChangePasswordInputs) => {
    props.onSubmit ? props.onSubmit(data) : console.log(data);
    reset();
  };

  return (
    <>
      <Form onFinish={handleSubmit(onSubmit)} name={'changePassword'} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.profile.password')}>
              <Input.Password {...field} />
              {errors.password && <Text type={'danger'}>{errors.password.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="newpassword"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.profile.newpassword')}>
              <Input.Password {...field} />
              {errors.newpassword && <Text type={'danger'}>{errors.newpassword.message}</Text>}
            </Form.Item>
          )}
        />
        <Controller
          name="repeatpassword"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('forms.profile.repeatPassword')}>
              <Input.Password {...field} />
              {errors.repeatpassword && <Text type={'danger'}>{errors.repeatpassword.message}</Text>}
            </Form.Item>
          )}
        />
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={props.loading}>
            {t(`Save`)}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
