import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {OrderDto} from '../../model/order-dto';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UseService {

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user);
  }

  viewUserInfo(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  updateUser(id: number, user): Observable<User> {
    return this.http.post<User>(`${API_URL}/users/${id}`, user);
  }

  getAllOrderByUserId(userId: number): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${API_URL}/users/${userId}/orders`);
  }
}
