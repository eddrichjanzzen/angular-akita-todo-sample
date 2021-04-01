import { GetAllTodosResponseModel } from 'src/app/core/models/todo.model';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TodoStore } from './todo.store';
import { TodoDataService } from 'src/app/core/services/todo-data-service';


@Injectable({ providedIn: 'root' })
export class TodoService {

  constructor(private todoStore: TodoStore,
              private todoDataService: TodoDataService) {
  }

  fetchAllTodos(): void {

    this.todoStore.setLoading(true);
    this.todoDataService.getAllTodos()
    .subscribe((todos: GetAllTodosResponseModel) => {

        // update the todo store here, set to the results
        this.todoStore.set(todos.results);
        this.todoStore.setLoading(false);

    }, (err) => {
      // set the error state
      this.todoStore.setError(err);
      this.todoStore.setLoading(false);

    });
  }
}
