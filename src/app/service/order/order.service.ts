import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';


import {OrderListDto} from '../../model/OrderListDto';

import {OrderList} from '../../model/OrderList';
import {Option} from '../../model/option';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  createOrderList(orderListDto: OrderListDto) {
    return this.httpClient.post(`${API_URL}/ordersList`, orderListDto);
  }

  getOrderListAll(): Observable<OrderList[]> {
    return this.httpClient.get<OrderList[]>(`${API_URL}/ordersList`);
  }

}
