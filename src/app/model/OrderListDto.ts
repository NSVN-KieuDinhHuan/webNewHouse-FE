import {Cart} from './cart';
import {DeliveryInfo} from './delivery-info';
import {User} from './user';

export interface OrderListDto {
  id?: number;
  createDate?: string;
  userId?: number;
  status?: number;
  orderDetailList:[];
}
