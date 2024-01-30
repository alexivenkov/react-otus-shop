import { Category } from '@/models/category';

export interface ProductInputs {
  name: string;
  photo: string;
  desc: string;
  oldPrice?: number;
  price: number;
  category: Category;
}
