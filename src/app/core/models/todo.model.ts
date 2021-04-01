import { PaginatedResponseModel } from './generic.model';
export interface TodoModel {
  id: string;
  title: string;
  description: string;
  created_date: Date;
  updated_date: Date;
  completed: boolean;
}

export interface GetAllTodosResponseModel extends PaginatedResponseModel<TodoModel>{

}
