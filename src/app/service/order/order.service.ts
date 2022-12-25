import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';



import {Option} from '../../model/option';
import {Observable} from 'rxjs';
import {OrderGroup} from '../../model/OrderGroup';
import {OrderDto} from '../../model/orderDto';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  createOrderList(Ordergroup: OrderGroup) {
    return this.httpClient.post(`${API_URL}/order-group`, Ordergroup);
  }

  getOrderGroupAll(): Observable<OrderGroup[]> {
    return this.httpClient.get<OrderGroup[]>(`${API_URL}/order-group`);
  }

  getOrderAll(): Observable<OrderDto[]> {
    return this.httpClient.get<OrderDto[]>(`${API_URL}/order`);
  }
}
