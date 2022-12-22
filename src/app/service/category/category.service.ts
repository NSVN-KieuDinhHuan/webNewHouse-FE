import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {result} from '../../model/result';
import {Category} from '../../model/category';
import {CategoryDto} from '../../model/categoryDto';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }
  getAllCategory(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${API_URL}/categories`);
  }
}
