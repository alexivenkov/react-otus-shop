import React, { FC } from 'react';
import { Info } from '@/components/Forms/Profile/Info/Info';
import { ChangePassword } from '@/components/Forms/Profile/ChangePassword/ChangePassword';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { ChangePasswordInputs, ProfileInfoInputs } from '@/components/Forms/Profile/types';

interface ProfileProps {
  email: string;
  name: string;
  onProfileSubmit: (data: ProfileInfoInputs) => void;
  infoLoading: boolean;
  onChangePassword: (data: ChangePasswordInputs) => void;
  changePasswordLoading: boolean;
}

export const Profile: FC<ProfileProps> = (props: ProfileProps) => {
  const { t } = useTranslation();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('forms.profile.info'),
      children: (
        <Info email={props.email} name={props.name} onSubmit={props.onProfileSubmit} loading={props.infoLoading} />
      ),
    },
    {
      key: '2',
      label: t('forms.profile.changePassword'),
      children: <ChangePassword onSubmit={props.onChangePassword} loading={props.changePasswordLoading} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};
