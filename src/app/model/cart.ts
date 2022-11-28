import {CartDetail} from './cart-detail';


export interface Cart {
  id?: number;
  user?: any;
  cartDetails?: CartDetail[];
  foodTotal?: number;
  discountAmount?: number;
  serviceFee?: number;
  shippingFee?: number;
  totalFee?: number;
}
