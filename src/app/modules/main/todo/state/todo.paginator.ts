import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { TodoQuery } from './todo.query';

export const TODO_PAGINATOR = new InjectionToken('TODO_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const todoQuery = inject(TodoQuery);
    return new PaginatorPlugin(todoQuery).withControls().withRange();
  }
});