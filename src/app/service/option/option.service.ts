import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../../model/dish';
import {Option} from '../../model/option';
import {DishForm} from '../../model/dishForm';
import {OptionGroup} from '../../model/optionGroup';
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

  getOptionGroupAll(): Observable<Option[]> {
    return this.httpClient.get<OptionGroup[]>(`${API_URL}/option-group`);
  }

  saveOption(option: FormData) {
    return this.httpClient.post<Option>(`${API_URL}/option`, option);
  }
  updateOption(id:number,option:FormData){
    return this.httpClient.post<Option>(`${API_URL}/option/edit/${id}`, option);
  }
  editSong(id:number,option:FormData): Observable<Option> {
    return this.httpClient.post(`${API_URL}/option/${id}`, option);
  }

  saveOptionGroup(optionGroup: FormData) {
    return this.httpClient.post<Option>(`${API_URL}/option-group`, optionGroup);
  }
}
