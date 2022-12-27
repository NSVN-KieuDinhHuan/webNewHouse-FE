import {Cart} from './cart';
import {DeliveryInfo} from './delivery-info';
import {User} from './user';
import {OrderDto} from './orderDto';

export interface OrderGroupDto {
  createDate?: Date;
  user?:User;
  status?: number;

}
