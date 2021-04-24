import { AddTodoResponseModel, SearchTodosRequestModel, SearchTodosResponseModel, TodoModel, UpdateTodoResponseModel } from 'src/app/core/models/todo.model';
import { Injectable } from '@angular/core';
import { ID, PaginationResponse, transaction } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TodoStore } from './todo.store';
import { TodoDataService } from 'src/app/core/services/todo-data-service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Observable } from 'rxjs';
import PaginationHelper from 'src/app/core/helper/pagination.helper';
import { catchError, map, take } from 'rxjs/operators';
import { PaginatedResponseModel } from 'src/app/core/models/generic.model';


@Injectable({ providedIn: 'root' })
export class TodoService {

  constructor(private todoStore: TodoStore,
              private todoDataService: TodoDataService,
              private toastrService: ToastrService) {
  }


  searchTodos(request:SearchTodosRequestModel) {
    this.todoStore.setLoading(true);
    this.todoDataService.search(request)
    .subscribe((response: SearchTodosResponseModel) => {
      this.updateTodos(response);
    });
  }

  @transaction()
  private updateTodos(response: SearchTodosResponseModel) {

    this.todoStore.add(response.results);
    if(response.next){
      const nextPage = parseInt(response.next.split('=')[1]);
      this.todoStore.updatePage({ hasMore: true, pageNumber: nextPage });
      this.todoStore.setLoading(false);
    }

    this.todoStore.setLoading(false);

  }

  addTodo(todoItem: TodoModel): void {
    this.todoDataService.create(todoItem)
    .subscribe((response: AddTodoResponseModel)=> {
      // update with the updated data 
      if(response.success){
        this.todoStore.add(todoItem, { prepend: true });
        this.toastrService.open("Successfully added item", "x");
      }

    }, (err)=>{
      // set the error state
      this.todoStore.setError(err);
      this.todoStore.setLoading(false);
    })
  }

  updateTodo(todoId: string, todoItem: TodoModel): void {
    this.todoDataService.update(todoId, todoItem)
    .subscribe((response: UpdateTodoResponseModel)=> {
      // update with the updated data 
      if(response.success){
        console.log(response);
        this.todoStore.update(todoId, response.data);
      }

    }, (err)=>{
      // set the error state
      this.todoStore.setError(err);
      this.todoStore.setLoading(false);
    })
  }


}
