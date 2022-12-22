import {Dish} from './dish';
import {productOption} from './productOption';

export interface CartDetail {
  id?:number,
  dish?: Dish;
  quantity?: number;
  productOption?:productOption[];
}
