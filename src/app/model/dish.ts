import {Category} from './category';
import {productOptionList} from './productOptionList';


export interface Dish {
  id?: number;
  name?: string;
  price?: number;
  categories?: Category[];
  optionOfProduct?: productOptionList[];
  sold?: number;
  description?: string;
  specifications?: string;
  image01?: string;
  image02?: string;
  image03?: string;
  image04?: string;
  image05?: string;
  image06?: string;
  image07?: string;
  image08?: string;

}
