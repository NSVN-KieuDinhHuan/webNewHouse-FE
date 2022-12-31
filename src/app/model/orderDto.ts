
import {OrderGroup} from './OrderGroup';
import {User} from './user';
import {Dish} from './dish';
import {Option} from './option';
export interface OrderDto {
  user: User
  product:Dish,
  optionList:Option[],
  quantity:number,
  CreateDate:String,
  status: any;
}
