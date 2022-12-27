
import {User} from './user';
import {OrderDto} from './orderDto';

export interface OrderGroup {
  user?: User;
  createDate?: string;
  status?: number;

}
