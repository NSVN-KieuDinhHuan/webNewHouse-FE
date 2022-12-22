
import {User} from './user';
import {OrderDetailDto} from './orderDetailDto';

export interface OrderList {
  User?: User;
  createDate?: string;
  status?: number;
  orderDetailList:OrderDetailDto[];
}
