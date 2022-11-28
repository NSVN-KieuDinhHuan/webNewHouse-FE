import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {result} from '../../model/result';
import {Category} from '../../model/category';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCategory() : Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${API_URL}/categories`,);
  }

  getTop5Categories() {
    return this.httpClient.get(`${API_URL}/categories/top-five`);
  }
}
