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
     return this.httpClient.get(`${API_URL}/carts/${id}`);
  }
  increaseQuantity(id:number) {
    return this.httpClient.get(`${API_URL}/carts/increase/${id}`);
  }
  decreaseQuantity(id:number) {
    return this.httpClient.get(`${API_URL}/carts/decrease/${id}`);
  }

  addDishToCart(cartDetail: { productOption: number[]; quantity: any; dishId: number }, id: number) {
    return this.httpClient.post(`${API_URL}/carts/addDish/${id}`, cartDetail);
  }

   deleteCartDetaiById(id:number) {
     return this.httpClient.get(`${API_URL}/carts/delete/${id}`);
   }

  getCurrentUserCarts() {
    const currentUserId = this.authService.getCurrentUserId();
    return this.httpClient.get(`${API_URL}/carts/users/${currentUserId}`);
  }




  getCurrentUserCartByMerchant(merchantId: number){
    const currentUserId = this.authService.getCurrentUserId();
    return this.httpClient.get(`${API_URL}/carts/users/${currentUserId}/merchants/${merchantId}`);
  }
}
