import {Dish} from './dish';
import {Option} from './option';


export interface CartDetail {
  id?:number,
  dish?: Dish;
  quantity?: number;
  options?:Option[];

}
