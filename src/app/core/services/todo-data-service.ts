
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { AddTodoRequestModel, AddTodoResponseModel, 
         SearchTodosRequestModel, SearchTodosResponseModel, 
         UpdateTodoRequestModel, UpdateTodoResponseModel } 
from '../models/todo.model';
import HttpRequestHelper from '../helper/http-request.helper';



@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: ApiHttpService) { }

  search(request: SearchTodosRequestModel): Observable<SearchTodosResponseModel>{
    return this.http.get(`/task?${HttpRequestHelper.ObjectToQueryParams(request)}`);
  }

  update(todoId: string, request: UpdateTodoRequestModel): Observable<UpdateTodoResponseModel>{
    return this.http.put(`/task/${todoId}`, request);
  }

  create(request: AddTodoRequestModel): Observable<AddTodoResponseModel>{
    return this.http.post('/task', request);
  }

}
