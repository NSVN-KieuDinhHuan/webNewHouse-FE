import {Category} from './category';
import {Merchant} from './merchant';

export interface Dish {
  id?: number;
  name?: string;
  price?: number;
  categories?: Category[];
  sold?: number;
  description?: string;
  image01?: string;
  image02?: string;
  image03?: string;
  image04?: string;
  image05?: string;
  image06?: string;
  image07?: string;
  image08?: string;
}
