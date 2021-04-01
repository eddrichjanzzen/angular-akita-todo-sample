
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { GetAllTodosResponseModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: ApiHttpService) { }

  getAllTodos(): Observable<GetAllTodosResponseModel>{
    return this.http.get('/task');
  }

}
