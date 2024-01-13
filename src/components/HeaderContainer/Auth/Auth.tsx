import React, { FC } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface AuthProps {
  token?: string;
}

export const Auth: FC<AuthProps> = ({ token }: AuthProps) => {
  const { t } = useTranslation();

  return (
    <>
      {!token && (
        <>
          <Button type={'link'}>
            <Link to={'/sign-in'}>{t('forms.auth.signIn')}</Link>
          </Button>
          <Button type={'link'}>
            <Link to={'/sign-up'}>{t('forms.auth.signUp')}</Link>
          </Button>
        </>
      )}
      {token && (
        <Button type={'link'}>
          <Link to={'/sign-out'}>{t('forms.auth.signOut')}</Link>
        </Button>
      )}
    </>
  );
};
