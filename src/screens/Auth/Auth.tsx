import React, { FC } from 'react';
import { Auth as AuthForm } from '@/components/Forms/Auth/Auth';
import { AuthType } from '@/components/Forms/Auth/types';
import cn from 'clsx';
import s from './Auth.sass';
import { useTranslation } from 'react-i18next';

interface AuthProps {
  type: AuthType;
}

export const Auth: FC<AuthProps> = (props: AuthProps) => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={cn(s.authLabel)}>{t(`forms.auth.${props.type}`)}</h2>
      <AuthForm type={props.type} />;
    </>
  );
};
