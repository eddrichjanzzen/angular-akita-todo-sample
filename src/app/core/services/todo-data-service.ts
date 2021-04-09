
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { AddTodoRequestModel, AddTodoResponseModel, GetAllTodosResponseModel, 
         UpdateTodoRequestModel, UpdateTodoResponseModel } 
from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: ApiHttpService) { }

  getAllTodos(): Observable<GetAllTodosResponseModel>{
    return this.http.get('/task');
  }

  updateTodo(todoId: string, request: UpdateTodoRequestModel): Observable<UpdateTodoResponseModel>{
    return this.http.put(`/task/${todoId}`, request);
  }

  addTodo(request: AddTodoRequestModel): Observable<AddTodoResponseModel>{
    return this.http.post('/task', request);
  }

}
