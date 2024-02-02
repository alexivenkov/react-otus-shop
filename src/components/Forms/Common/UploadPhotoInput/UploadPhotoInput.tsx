import React, { FC } from 'react';
// eslint-disable-next-line import/named
import { Button, Form, Input, Space, Typography, Upload, UploadProps } from 'antd';
import { apiPath, apiUrl, getAuthHeader } from '@/utils/api';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/hooks/useNotification';
import cn from 'clsx';
import s from './UploadPhotoInput.sass';
import { UploadOutlined } from '@ant-design/icons';
import { FieldError, FieldValues, SetFieldValue, UseControllerProps } from 'react-hook-form';

const { Text } = Typography;
const validExtensions = ['image/png', 'image/jpeg', 'image'];

interface UploadPhotoInputProps {
  field: UseControllerProps;
  error: FieldError;
  urlSetter: SetFieldValue<FieldValues>;
}

export const UploadPhotoInput: FC<UploadPhotoInputProps> = (props: UploadPhotoInputProps) => {
  const { t } = useTranslation();
  const { showSuccess, showWarning } = useNotification();

  const uploadParams: UploadProps = {
    name: 'file',
    action: `${apiUrl}${apiPath}/upload`,
    headers: {
      ...getAuthHeader(),
    },
    showUploadList: false,
    beforeUpload: (file) => {
      const granted = validExtensions.includes(file.type);

      if (!granted) {
        showWarning(`${file.type} ${t('forms.upload.invalid')}`);
      }

      return granted;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        showSuccess(t('forms.upload.success'));
        props.urlSetter('photo', info.file.response.url);
      }
    },
  };

  return (
    <>
      <Form.Item label={t('forms.category.photo')}>
        <Space.Compact className={cn(s.uploadContainer)}>
          <Input {...props.field} />
          <Upload {...uploadParams}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Space.Compact>
        {props.error && <Text type={'danger'}>{props.error.message}</Text>}
      </Form.Item>
    </>
  );
};
