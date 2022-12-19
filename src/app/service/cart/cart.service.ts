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

  createCart(id:number) {
    return this.httpClient.post(`${API_URL}/carts`, id);
  }
  findAllCart() {
    return this.httpClient.get(`${API_URL}/carts`);
  }
  getAllDetailByCartId(id:number) {
     return this.httpClient.get(`${API_URL}/carts/{id}`);
  }

  addDishToCart(cartDetail: CartDetail,id:number) {
    return this.httpClient.post(`${API_URL}/carts/addDish/${id}`, cartDetail);
  }
  getCurrentUserCarts() {
    const currentUserId = this.authService.getCurrentUserId();
    return this.httpClient.get(`${API_URL}/carts/users/${currentUserId}`);
  }



  increaseDishQuantity(cartId: number, dishId: number) {
    return this.httpClient.get(`${API_URL}/carts/${cartId}/increase-dish-quantity/${dishId}`);
  }

  decreaseDishQuantity(cartId: number, dishId: number) {
    return this.httpClient.get(`${API_URL}/carts/${cartId}/decrease-dish-quantity/${dishId}`);
  }

  getCurrentUserCartByMerchant(merchantId: number){
    const currentUserId = this.authService.getCurrentUserId();
    return this.httpClient.get(`${API_URL}/carts/users/${currentUserId}/merchants/${merchantId}`);
  }
}
