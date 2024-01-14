import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, Context } from '@/App';

export const Auth: FC = () => {
  const context: AppContext = useContext<AppContext>(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSignOut = () => {
    context.onSignOut();
    navigate('/');
  };

  return (
    <>
      {!context.token && (
        <>
          <Button type={'link'}>
            <Link to={'/sign-in'}>{t('forms.auth.signIn')}</Link>
          </Button>
          <Button type={'link'}>
            <Link to={'/sign-up'}>{t('forms.auth.signUp')}</Link>
          </Button>
        </>
      )}
      {context.token && <Button onClick={onSignOut}>{t('forms.auth.signOut')}</Button>}
    </>
  );
};
