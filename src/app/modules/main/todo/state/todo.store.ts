import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TodoModel } from 'src/app/core/models/todo.model';


export interface TodoState extends EntityState<TodoModel> {
  hasMore: boolean;
  pageNumber: number; 
}

const initialState: TodoState = {
  hasMore: true,
  pageNumber: 1
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState, TodoModel> {

  constructor() {
    super(initialState);
  }

  updatePage(page: TodoState) {
    this.update(page);
  }

}

