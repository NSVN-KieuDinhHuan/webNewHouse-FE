
import {OrderGroup} from './OrderGroup';



export interface OrderDto {
  dishId?: number;
  quantity?: number;
  optionList?: number[];
  OrderGroup?: OrderGroup[]
}
