import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../../model/dish';
import {Option} from '../../model/option';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private httpClient: HttpClient) {
  }

  getById(id: number): Observable<Option> {
    return this.httpClient.get<Option>(`${API_URL}/option/${id}`);
  }

  getAll(): Observable<Option[]> {
    return this.httpClient.get<Option[]>(`${API_URL}/option`);
  }
}
