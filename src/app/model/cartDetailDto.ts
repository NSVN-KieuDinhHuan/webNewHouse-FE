import {Dish} from './dish';
import {productOption} from './productOption';

export interface CartDetailDto {
  id?:number,
  dishId?: number;
  quantity?: number;
  productOptions?:productOption[];
}
