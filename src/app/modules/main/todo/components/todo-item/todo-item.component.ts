import { Component, Input, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoQuery } from '../../state/todo.query';
import { TodoService } from '../../state/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoModel;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  toggle(todoItem: TodoModel): void {

    // use spread syntx to create a new copy of the object
    var updatedTodo = { ...todoItem, completed: !todoItem.completed}

    this.todoService.updateTodo(todoItem.id, updatedTodo);
  }


}
