import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { TodoService } from '../../state/todo.service';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoQuery } from '../../state/todo.query';
import { TODO_PAGINATOR } from '../../state/todo.paginator';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { TodoState } from '../../state/todo.store';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  isLoading$: Observable<boolean>;
  todos$: Observable<Array<TodoModel>>;


  constructor(@Inject(TODO_PAGINATOR)
              public todoPaginator: PaginatorPlugin<TodoState>,
              private todoService: TodoService,
              private todoQuery: TodoQuery) { }

  ngOnInit(): void {
    this.fetchTodos();
    this.todos$ = this.todoQuery.selectAll();
    this.isLoading$ = this.todoQuery.selectLoading();
  }

  onScroll() {
    this.fetchTodos();
  }

  private fetchTodos() {
    if (this.todoQuery.getHasMore()) {
      
      const pageNumber = this.todoQuery.getPageNumber()
      this.todoService.searchTodos({
        page: pageNumber
      });
    }
  }


}
