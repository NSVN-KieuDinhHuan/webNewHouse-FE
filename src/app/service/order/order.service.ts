import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';



import {Option} from '../../model/option';
import {Observable} from 'rxjs';
import {OrderGroup} from '../../model/OrderGroup';
import {OrderDto} from '../../model/orderDto';
import {OrderGroupDto} from '../../model/OrderGroupDto';
import {Order} from '../../model/order';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  saveOrder(order: Order[]) {
    return this.httpClient.post(`${API_URL}/order`, order);
  }

  saveOrderGroup(orderDto: OrderGroupDto) {
    return this.httpClient.post(`${API_URL}/order-group`, orderDto);
  }

  getOrderGroupAll(): Observable<OrderGroup[]> {
    return this.httpClient.get<OrderGroup[]>(`${API_URL}/order-group`);
  }

  getOrderAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${API_URL}/order`);
  }
}
