import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoQuery } from '../../state/todo.query';
import { TodoService } from '../../state/todo.service';
import { debounceTime, startWith, switchMap, tap } from 'rxjs/operators';
import { TODO_PAGINATOR } from '../../state/todo.paginator';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { TodoState } from '../../state/todo.store';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-inbox',
  templateUrl: './todo-inbox.component.html',
  styleUrls: ['./todo-inbox.component.scss']
})
export class TodoInboxComponent implements OnInit {

  isLoading: boolean = false;
  todos: PaginationResponse<TodoModel>;
  searchControl = new FormControl('');

  constructor(@Inject(TODO_PAGINATOR) 
    public paginatorRef: PaginatorPlugin<TodoModel>,
    private todoService: TodoService,
    private todoQuery: TodoQuery) { }

  ngOnInit(): void {
    
    this.paginatorRef.isLoading$.subscribe((loading)=>{
      this.isLoading = loading;
    })

    const filter$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      tap(() => {
        this.paginatorRef.refreshCurrentPage();
      })
    )

    const paginator$ = this.paginatorRef.pageChanges.pipe(
      debounceTime(1000),
      tap(() => { 
        this.paginatorRef.clearCache({clearStore: true})
      })
    );

    combineLatest([
      paginator$,
      filter$
    ]).pipe(
      switchMap(([page, title]: [number, string]) => {
        
        const reqFn = () => this.todoService.fetchTodos({
          page: page,
          title: title
        });

      return <Observable<PaginationResponse<TodoModel>>> this.paginatorRef.getPage(reqFn);
    })).subscribe((response)=> {

      this.todos = response;
    });


  }

  private fetchTodos(title: string) : void {
    if (this.todoQuery.getHasMore()) {
      const pageNumber = this.todoQuery.getPageNumber()
      this.todoService.searchTodos({
        page: pageNumber,
        title: title
      });
    }
  }

  onScrolled() : void { 
    // this.fetchTodos();
  }

}
