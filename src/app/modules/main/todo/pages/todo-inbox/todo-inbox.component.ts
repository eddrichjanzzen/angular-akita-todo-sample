import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoModel } from 'src/app/core/models/todo.model';
import { TodoQuery } from '../../state/todo.query';
import { TodoService } from '../../state/todo.service';
import { debounceTime, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-todo-inbox',
  templateUrl: './todo-inbox.component.html',
  styleUrls: ['./todo-inbox.component.scss']
})
export class TodoInboxComponent implements OnInit {

  isLoading: boolean = false;
  todos: Array<TodoModel> = [];
  searchControl = new FormControl('');

  constructor(
    private todoService: TodoService,
    private todoQuery: TodoQuery) { }

  ngOnInit(): void {
    // this.fetchTodos();
    this.todoQuery.selectAll().subscribe((data)=> {
        this.todos = data;
    });

    this.todoQuery.selectLoading().subscribe((loading) => {
        this.isLoading = loading;
    });
  }

  private fetchTodos() : void {
    if (this.todoQuery.getHasMore()) {
      const pageNumber = this.todoQuery.getPageNumber()
      this.todoService.searchTodos({
        page: pageNumber
      });
    }
  }

  onScrolled() : void { 
    this.fetchTodos();
  }

}
