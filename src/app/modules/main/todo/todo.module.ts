import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoInboxComponent } from './pages/todo-inbox/todo-inbox.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoItemComponent,
    AddTodoComponent,
    TodoInboxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
