import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TodoModel } from 'src/app/core/models/todo.model';


export interface TodoState extends EntityState<TodoModel> {
  ui: {
    isLoading: boolean;  
  };
}

const initialState = {
  ui: { 
    isLoading: false
  }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState, TodoModel> {

  constructor() {
    super(initialState);
  }

  todoULoading(isLoading: boolean){
    this.update({ui: {isLoading}})
  }

}

