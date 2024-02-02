import { UploadPhotoInput } from '@/components/Forms/Common/UploadPhotoInput/types';

export interface ProductInputs extends UploadPhotoInput {
  name: string;
  desc: string;
  oldPrice?: number;
  price: number;
  category: string;
}
