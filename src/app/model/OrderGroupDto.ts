import {Cart} from './cart';
import {DeliveryInfo} from './delivery-info';
import {User} from './user';
import {OrderDto} from './orderDto';

export interface OrderGroupDto {
  createDate?: string;
  userPhone?:string;
  status?: number;

}
