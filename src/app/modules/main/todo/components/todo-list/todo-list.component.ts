import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoModel } from 'src/app/core/models/todo.model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() todos: Array<TodoModel>;
  @Output() scrolled = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onScroll() {
    this.scrolled.next();
  }




}
