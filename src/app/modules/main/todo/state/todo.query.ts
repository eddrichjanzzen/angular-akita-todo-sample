import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoStore, TodoState } from './todo.store';

@Injectable({
  providedIn: 'root'
})
export class TodoQuery extends QueryEntity<TodoState, TodoModel> {

  constructor(protected store: TodoStore) {
    super(store);
  }

  getHasMore() {
    return this.store.getValue().hasMore;
  }

  getPageNumber() {
    return this.store.getValue().pageNumber;
  }


}
