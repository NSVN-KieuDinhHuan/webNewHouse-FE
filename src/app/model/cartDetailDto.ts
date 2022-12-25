import {Dish} from './dish';
import {Option} from './option';


export interface CartDetailDto {
  id?:number,
  dishId?: number;
  quantity?: number;
  options?:Option[];
}
