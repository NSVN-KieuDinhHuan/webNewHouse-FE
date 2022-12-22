import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Dish} from '../../model/dish';
import {HttpClient} from '@angular/common/http';
import {SearchForm} from '../../model/search-form';
import {result} from '../../model/result';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(pageNumber:number): Observable<result> {
    return this.httpClient.get<result>(`${API_URL}/dishes/page/${pageNumber}`,);
  }

  getById(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>(`${API_URL}/dishes/${id}`);
  }
    findAll(): Observable<result> {
    return this.httpClient.get<result>(`${API_URL}/dishes/all`);
  }


  getMostPurchasedDishes() {
    return this.httpClient.get(`${API_URL}/dishes/most-purchased/8`);
  }

  searchDishes(searchForm: SearchForm) {
    return this.httpClient.post<Dish[]>(`${API_URL}/dishes/search`, searchForm);
  }

  getDishbyCategoryID(id:number) {
    return this.httpClient.get<Dish[]>(`${API_URL}/dishes/category/${id}`);
  }

  findDishesWithSameCategoryWith(dishId: number, limit: number): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`${API_URL}/dishes/${dishId}/top-${limit}-same-category`);
  }
}
