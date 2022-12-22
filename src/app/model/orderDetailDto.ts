import {User} from './user';
import {DeliveryInfo} from './delivery-info';
import {productOption} from './productOption';

export interface OrderDetailDto {
  dishId?: number;
  quantity?: number;
  productOption?: number[];
}
