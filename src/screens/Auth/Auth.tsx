import React, { FC } from 'react';
import { Auth as AuthForm } from '@/components/Forms/Auth/Auth';
import { AuthType } from '@/components/Forms/Auth/types';
import cn from 'clsx';
import s from './Auth.sass';

interface AuthProps {
  type: AuthType;
}

export const Auth: FC<AuthProps> = (props: AuthProps) => {
  return (
    <>
      <h2 className={cn(s.authLabel)}>{props.type}</h2>
      <AuthForm type={props.type} />;
    </>
  );
};
