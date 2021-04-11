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

  // todos$: Observable<Array<TodoModel>>;
  isLoading$: Observable<boolean>;
  todos$: Observable<PaginationResponse<TodoModel>>;

  constructor(@Inject(TODO_PAGINATOR)
              public todoPaginator: PaginatorPlugin<TodoState>,
              private todoService: TodoService,
              private todoQuery: TodoQuery) { }

  ngOnInit(): void {

    this.isLoading$ = this.todoPaginator.isLoading$;
  
    this.todos$ = this.todoPaginator.pageChanges.pipe(
      switchMap((page:number) => {
        const requestFn = () => this.todoService.fetchTodosByPage({
          page: page
        });
        return <Observable<PaginationResponse<TodoModel>>> this.todoPaginator.getPage(requestFn);
      })
    )
  }

}
