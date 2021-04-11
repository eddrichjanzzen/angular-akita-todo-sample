import { AddTodoResponseModel, SearchTodosRequestModel, SearchTodosResponseModel, TodoModel, UpdateTodoResponseModel } from 'src/app/core/models/todo.model';
import { Injectable } from '@angular/core';
import { ID, PaginationResponse } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TodoStore } from './todo.store';
import { TodoDataService } from 'src/app/core/services/todo-data-service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Observable } from 'rxjs';
import PaginationHelper from 'src/app/core/helper/pagination.helper';
import { catchError, map, take } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class TodoService {

  constructor(private todoStore: TodoStore,
              private todoDataService: TodoDataService,
              private toastrService: ToastrService) {
  }


  fetchTodosByPage(request:SearchTodosRequestModel) : Observable<PaginationResponse<TodoModel>> {
    return this.todoDataService.search(request).pipe(
        map((value:SearchTodosResponseModel) => {
          return PaginationHelper.transfomToAkitaPaginationMapper(value, request, "id");
        }),
        catchError((err, caught) => {
            this.toastrService.open("We couldn't fetch clients data. Please try again. If this continues, please contact us at support@cabana.swayseast.com.", "Uh oh.");

            return caught;
        }),
        take(1)
    );
  }



  searchTodos(request: SearchTodosRequestModel): void {

    this.todoStore.setLoading(true);
    this.todoDataService.search(request)
    .subscribe((todos: SearchTodosResponseModel) => {

        // update the todo store here, set to the results
        this.todoStore.set(todos.results);
        this.todoStore.setLoading(false);

    }, (err) => {
      // set the error state
      this.todoStore.setError(err);
      this.todoStore.setLoading(false);

    });
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
