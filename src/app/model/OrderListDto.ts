import {Cart} from './cart';
import {DeliveryInfo} from './delivery-info';
import {User} from './user';
import {OrderDetailDto} from './orderDetailDto';

export interface OrderListDto {
  createDate?: string;
  userPhone?:string;
  status?: number;
  orderDetailList:OrderDetailDto[];
}