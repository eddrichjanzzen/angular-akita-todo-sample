import { PaginatedRequestModel, PaginatedResponseModel, ResponseModel } from './generic.model';

export interface TodoModel {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  created_date?: Date;
  updated_date?: Date;
  completed: boolean;
}

export interface SearchTodosRequestModel extends PaginatedRequestModel{
  // all optional
  title: string;
  completed?: boolean; 
}

export interface SearchTodosResponseModel extends PaginatedResponseModel<TodoModel>{ }

export interface UpdateTodoRequestModel extends TodoModel { }

export interface UpdateTodoResponseModel extends ResponseModel<TodoModel> { }

export interface AddTodoRequestModel extends TodoModel { }

export interface AddTodoResponseModel extends ResponseModel<TodoModel> { }

export interface DeleteTodoResponseModel {
  success: boolean;
}