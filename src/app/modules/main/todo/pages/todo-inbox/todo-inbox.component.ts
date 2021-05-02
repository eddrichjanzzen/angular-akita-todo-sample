import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoQuery } from '../../state/todo.query';
import { TodoService } from '../../state/todo.service';
import { debounceTime, startWith, switchMap, tap } from 'rxjs/operators';
import { TODO_PAGINATOR } from '../../state/todo.paginator';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-todo-inbox',
  templateUrl: './todo-inbox.component.html',
  styleUrls: ['./todo-inbox.component.scss']
})
export class TodoInboxComponent implements OnInit {

  isLoading: boolean = false;
  todos: PaginationResponse<TodoModel>;
  searchControl = new FormControl('');
  onInboxScrolled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  currentPageSize: number = 0;
  PAGE_SIZE = 7;

  constructor(@Inject(TODO_PAGINATOR) 
    public paginatorRef: PaginatorPlugin<TodoModel>,
    private todoService: TodoService,
    private todoQuery: TodoQuery) { }

  ngOnInit(): void {
    
    this.paginatorRef.isLoading$.subscribe((loading)=>{
      this.isLoading = loading;
    })

    const paginator$ = this.paginatorRef.pageChanges.pipe(
      untilDestroyed(this),
      tap(() => { 
        this.paginatorRef.clearCache({clearStore: true})
      })
    );

    const filter$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      untilDestroyed(this),
      tap(() => {
        this.paginatorRef.clearCache({clearStore: true})
      })
    )

    const inboxScrolled$ = this.onInboxScrolled$.pipe(
      untilDestroyed(this),
      tap(() => {
        this.currentPageSize += this.PAGE_SIZE;
        this.paginatorRef.clearCache({clearStore: true})
        this.paginatorRef.refreshCurrentPage();
      })
    )

    combineLatest([
      paginator$,
      filter$,
      inboxScrolled$
    ]).pipe(
      untilDestroyed(this),
      switchMap(([page, title, scrolled]: [number, string, boolean]) => {
        
        const reqFn = () => this.todoService.fetchTodos({
          page: page,
          pagesize: this.currentPageSize,
          title: title,
        });

      return <Observable<PaginationResponse<TodoModel>>> this.paginatorRef.getPage(reqFn);
    
    })).subscribe((response)=> {
      this.todos = response;
    });
  }


  onScrolled() : void { 
    if(!this.paginatorRef.isLast){
      
      //set on list scrolled value to true
      this.onInboxScrolled$.next(true);
    }
  }

  ngOnDestroy(){
  }

}
