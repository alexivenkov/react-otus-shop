import React, { FC, useEffect } from 'react';
import { Profile as ProfileForm } from '@/components/Forms/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions, profileSelectors } from '@/store/slices/profile';
import { Status } from '@/store/states';
import { ChangePasswordInputs, ProfileInfoInputs } from '@/components/Forms/Profile/types';
import { api, getAuthHeader } from '@/utils/api';
import { APIError } from '@/utils/api/errors';
import { useNotification } from '@/hooks/useNotification';
import { useTranslation } from 'react-i18next';

export const Profile: FC = () => {
  const profile = useSelector(profileSelectors.get);
  const dispatch = useDispatch();
  const onProfileSubmit = (data: ProfileInfoInputs) => {
    dispatch(
      profileActions.update({
        name: data.name,
      })
    );
  };

  const { showSuccess, showError } = useNotification();
  const { t } = useTranslation();

  const onChangePassword = async (data: ChangePasswordInputs) => {
    try {
      await api.post(
        'profile/change-password',
        {
          password: data.password,
          newPassword: data.newpassword,
        },
        { ...getAuthHeader() }
      );

      showSuccess(t('messages.passwordUpdated'));
    } catch (e) {
      console.error(e);
      showError(e);
    }
  };

  useEffect(() => {
    if (profile.status == Status.succeeded) {
      showSuccess('Profile Updated');
    }

    if (profile.status == Status.failed) {
      showError(profile.error);
    }
  }, [profile.status]);

  return (
    <>
      <ProfileForm
        onProfileSubmit={onProfileSubmit}
        email={profile.data?.email}
        name={profile.data?.name}
        infoLoading={profile.status == Status.loading}
        onChangePassword={onChangePassword}
        changePasswordLoading={false}
      />
    </>
  );
};
