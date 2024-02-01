import React, { FC, useEffect } from 'react';
import { Auth as AuthForm } from '@/components/Forms/Auth/Auth';
import { AuthInputs, AuthType } from '@/components/Forms/Auth/types';
import cn from 'clsx';
import s from './Auth.sass';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelectors } from '@/store/slices/auth';
import { Status } from '@/store/states';
import { useNotification } from '@/hooks/useNotification';

interface AuthProps {
  type: AuthType;
}

export const Auth: FC<AuthProps> = (props: AuthProps) => {
  const dispatch = useDispatch();
  const error = useSelector(authSelectors.error);
  const status = useSelector(authSelectors.status);
  const { showError } = useNotification();
  const { t } = useTranslation();

  const onSubmit = (data: AuthInputs) => {
    dispatch(
      authActions.auth({
        type: props.type,
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (status == Status.failed) {
      showError(error);

      dispatch(
        authActions.setMeta({
          status: Status.idle,
        })
      );
    }
  }, [status]);

  return (
    <>
      <h2 className={cn(s.authLabel)}>{t(`forms.auth.${props.type}`)}</h2>
      <AuthForm type={props.type} onSubmit={onSubmit} loading={status == Status.loading} />
    </>
  );
};
