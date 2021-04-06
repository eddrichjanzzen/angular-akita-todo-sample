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
    this.todoService.updateTodo(todoItem.id, todoItem);
    console.log("toggled")
    // alert("toggled");
  }


}
