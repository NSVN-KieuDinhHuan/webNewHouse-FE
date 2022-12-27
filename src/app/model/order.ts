import {OrderGroup} from './OrderGroup';
import {Option} from './option';

export interface Order {
  dishId?: number;
  quantity?: number;
  optionList?: Option[];
  orderGroup?: OrderGroup
}
