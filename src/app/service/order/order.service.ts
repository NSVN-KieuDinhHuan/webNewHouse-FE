import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {OrderListDto} from '../../model/OrderListDto';
import {Dish} from '../../model/dish';
import {OrderDetailDto} from '../../model/orderDetailDto';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  createOrderDetail(OrderListDto: { address: any; phone: any; email: any; username: any }): Observable<OrderListDto> {
    return this.httpClient.post<OrderListDto>(`${API_URL}/api/ordersList`, OrderListDto);
  }
  createOrderList(OrderDetailDto: OrderDetailDto): Observable<OrderDetailDto> {
    return this.httpClient.post<OrderDetailDto>(`${API_URL}/api/orderdetail`, OrderDetailDto);
  }
}
