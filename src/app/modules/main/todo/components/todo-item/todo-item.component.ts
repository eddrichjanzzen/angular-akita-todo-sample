import { Component, Input, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoModel;

  constructor() { }

  ngOnInit(): void {
  }

}
