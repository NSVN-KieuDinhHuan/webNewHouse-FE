import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {result} from '../../model/result';
import {Category} from '../../model/category';
import {CategoryDto} from '../../model/categoryDto';
import {SearchForm} from '../../model/search-form';
import {Dish} from '../../model/dish';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CategoryService {


  constructor(private http: HttpClient) { }
  getAllCategory(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${API_URL}/categories`);
  }
  createCategory(category: CategoryDto) {
    return this.http.post<CategoryDto[]>(`${API_URL}/categories`, category);
  }
  DeleteCategory(id: number): Observable<Dish> {
    return this.http.delete<Dish>(`${API_URL}/categories/${id}`);
  }
}
