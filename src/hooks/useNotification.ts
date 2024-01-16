import { useTranslation } from 'react-i18next';
import { notification } from 'antd';
import { APIError } from '@/utils/api/errors';

export const useNotification = () => {
  const { t } = useTranslation();

  return {
    showSuccess: (title: string, message = '') =>
      notification.success({
        message: title,
        description: message,
      }),
    showError: (error: Error) => {
      if (error instanceof APIError) {
        error.errors.errors.forEach((e) => {
          notification.error({
            message: `${error.status}`,
            description: t(`messages.errors.${e.extensions.code}`),
          });
        });
      } else {
        notification.error({
          message: error.message,
        });
      }
    },
  };
};
