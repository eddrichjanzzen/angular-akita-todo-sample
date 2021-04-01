import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TodoModel } from 'src/app/core/models/todo.model';


export interface TodoState extends EntityState<TodoModel> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState, TodoModel> {

  constructor() {
    super();
  }

}

