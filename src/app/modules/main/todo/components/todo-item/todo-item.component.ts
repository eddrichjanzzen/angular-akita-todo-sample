import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TODO_PAGINATOR } from '../../state/todo.paginator';
import { TodoQuery } from '../../state/todo.query';
import { TodoService } from '../../state/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoModel;
  @Output() toggled = new EventEmitter<TodoModel>();

  constructor(
    private todoService: TodoService) { }

  ngOnInit(): void {
  }

  toggle(todoItem: TodoModel): void {
    // use spread syntax to create a new copy of the object
    var updatedTodo = { ...todoItem, completed: !todoItem.completed}
    this.todoService.updateTodo(todoItem.id, updatedTodo);
  }

  delete(todoId: string): void {
    this.todoService.deleteTodo(todoId);
  }


}
