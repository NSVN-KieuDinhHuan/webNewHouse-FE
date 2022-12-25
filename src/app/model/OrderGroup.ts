
import {User} from './user';
import {OrderDto} from './orderDto';

export interface OrderGroup {
  User?: User;
  createDate?: string;
  status?: number;

}
