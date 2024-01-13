import React, { FC } from 'react';
import { Auth as AuthForm } from '@/components/Forms/Auth/Auth';
import { AuthInputs, AuthType } from '@/components/Forms/Auth/types';
import cn from 'clsx';
import s from './Auth.sass';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelectors } from '@/store/slices/auth';
import { Status } from '@/store/states';

interface AuthProps {
  type: AuthType;
}

export const Auth: FC<AuthProps> = (props: AuthProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(authSelectors.status);
  const { t } = useTranslation();

  const onSubmit = (data: AuthInputs) => {
    dispatch(
      authActions[props.type]({
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <>
      <h2 className={cn(s.authLabel)}>{t(`forms.auth.${props.type}`)}</h2>
      <AuthForm type={props.type} onSubmit={onSubmit} loading={loading == Status.loading} />
    </>
  );
};
