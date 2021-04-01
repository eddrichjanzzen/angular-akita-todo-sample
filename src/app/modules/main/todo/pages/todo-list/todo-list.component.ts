import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../state/todo.service';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoQuery } from '../../state/todo.query';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Array<TodoModel>>;
  isLoading$: Observable<boolean>;

  constructor(private todoService: TodoService,
              private todoQuery: TodoQuery) { }

  ngOnInit(): void {
    this.todoService.fetchAllTodos();

    this.todos$ = this.todoQuery.selectAll();
    this.isLoading$ = this.todoQuery.selectLoading();
  }

}
