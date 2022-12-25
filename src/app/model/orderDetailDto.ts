import {User} from './user';
import {DeliveryInfo} from './delivery-info';


export interface OrderDetailDto {
  dishId?: number;
  quantity?: number;
  productOption?: number[];
}
