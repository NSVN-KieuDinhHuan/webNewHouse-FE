import {User} from './user';
import {DeliveryInfo} from './delivery-info';

export interface OrderDetailDto {
  id?: number;
  dishId?: number;
  productOption?: []
  quantity?: number;
}
