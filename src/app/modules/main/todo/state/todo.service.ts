import { AddTodoResponseModel, DeleteTodoResponseModel, SearchTodosRequestModel, SearchTodosResponseModel, TodoModel, UpdateTodoResponseModel } from 'src/app/core/models/todo.model';
import { Inject, Injectable } from '@angular/core';
import { ID, PaginationResponse, PaginatorPlugin, transaction } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TodoStore } from './todo.store';
import { TodoDataService } from 'src/app/core/services/todo-data-service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Observable } from 'rxjs';
import PaginationHelper from 'src/app/core/helper/pagination.helper';
import { catchError, debounceTime, map, take } from 'rxjs/operators';
import { PaginatedResponseModel } from 'src/app/core/models/generic.model';
import { TODO_PAGINATOR } from './todo.paginator';


@Injectable({ providedIn: 'root' })
export class TodoService {

  constructor(@Inject(TODO_PAGINATOR) 
              public paginatorRef: PaginatorPlugin<TodoModel>,
              private todoStore: TodoStore,
              private todoDataService: TodoDataService,
              private toastrService: ToastrService) {
  }


  fetchTodos(request: SearchTodosRequestModel) : Observable<PaginationResponse<TodoModel>> {
    this.todoStore.setLoading(true);
    
    return this.todoDataService.search(request).pipe(
      map((response:SearchTodosResponseModel) => {
          if(response.results !== null) {
              this.todoStore.setLoading(false);
              return PaginationHelper.transfomToAkitaPaginationMapper(response, request, "id");
          } 
          this.todoStore.setLoading(false);
          return {} as PaginationResponse<TodoModel>;
          
      }),
      catchError((err, caught) => {
          this.toastrService.open("We couldn't fetch your data, please try again later", "x");
          return caught;
      }),
      take(1)
    );
}

  addTodo(todoItem: TodoModel): void {
    this.todoStore.setLoading(true);
    this.todoDataService.create(todoItem)
    .subscribe((response: AddTodoResponseModel)=> {
      // update with the updated data 
      if(response.success){
        this.todoStore.add(response.data, { prepend: true });
        this.paginatorRef.clearCache({clearStore: true})
        this.paginatorRef.refreshCurrentPage();
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
        this.todoStore.update(todoId, response.data);
      }

    }, (err)=>{
      // set the error state
      this.todoStore.setError(err);
      this.todoStore.setLoading(false);
    })
  }

  deleteTodo(todoId: string): void {
    this.todoDataService.delete(todoId)
    .subscribe((response: DeleteTodoResponseModel)=> {
      // update with the updated data 
      if(response.success){
        this.todoStore.remove(todoId);
        this.paginatorRef.clearCache({clearStore: true})
        this.paginatorRef.refreshCurrentPage();
      }

    }, (err)=>{
      // set the error state
      this.todoStore.setError(err);
      this.todoStore.setLoading(false);
      this.toastrService.open("An error occured in deleting this item", "x");
    })
  }


}
