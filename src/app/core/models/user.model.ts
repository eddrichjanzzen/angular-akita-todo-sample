export interface UserModel {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface RegisterUserRequestModel {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface RegisterUserResponseModel {
  user: UserModel;
  token: string;
}

export interface LoginUserRequestModel {
  email: string;
  password: string;
}

export interface LoginUserResponseModel{
  user: UserModel;
  token: string;
 }

export interface LogoutUserResponseModel {
  success: boolean;
}

export interface UpdateUserRequestModel {
  age: number;
}

export interface UpdateUserResponseModel{
  data: UserModel;
  success: boolean;
}
