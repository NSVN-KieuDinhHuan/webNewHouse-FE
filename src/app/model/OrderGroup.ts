
import {User} from './user';
import {OrderDto} from './orderDto';

export interface OrderGroup {
  id:number
  user?: User;
  createDate?: string;
  status?: number;

}
