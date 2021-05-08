import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TodoModel } from 'src/app/core/models/todo.model';

// remember to inclue active state
export interface TodoState extends EntityState<TodoModel, string>, ActiveState {}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState, TodoModel> {

  constructor() {
    super();
  }

}

