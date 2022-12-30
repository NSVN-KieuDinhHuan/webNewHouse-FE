import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CartDetail} from '../../model/cart-detail';
import {Cart} from '../../model/cart';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService
              ) {
  }

  createCartGroup(id:number) {
    return this.httpClient.post(`${API_URL}/cart-group`, id);
  }
  findAllCartGroup() {
    return this.httpClient.get(`${API_URL}/cart-group`);
  }
  getAllCartByCartGroupId(id:number) {
     return this.httpClient.get(`${API_URL}/cart/cart-group/${id}`);
  }
  increaseQuantity(id:number) {
    return this.httpClient.get(`${API_URL}/cart/increase/${id}`);
  }
  decreaseQuantity(id:number) {
    return this.httpClient.get(`${API_URL}/cart/decrease/${id}`);
  }
  getCartGroupById(id:number) {
    return this.httpClient.get(`${API_URL}/cart-group/${id}`);
  }
  addDishToCart(cart: { optionList: number[]; quantity: any; dishId: number; cartGroupId:number }) {
    return this.httpClient.post(`${API_URL}/cart-group/addDish`, cart);
  }

   deleteCartById(id:number) {
     return this.httpClient.get(`${API_URL}/cart/delete/${id}`);
   }

  getCurrentUserCarts() {
    const currentUserId = this.authService.getCurrentUserId();
    return this.httpClient.get(`${API_URL}/carts/users/${currentUserId}`);
  }

  emptyCart(id:number){
     return this.httpClient.get(`${API_URL}/delete/cart/cart-group/${id}`);
   }



  getCurrentUserCartByMerchant(merchantId: number){
    const currentUserId = this.authService.getCurrentUserId();
    return this.httpClient.get(`${API_URL}/carts/users/${currentUserId}/merchants/${merchantId}`);
  }
}
