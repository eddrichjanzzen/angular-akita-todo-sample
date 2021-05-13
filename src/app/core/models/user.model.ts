import { TokenModel } from './token.model';

export interface UserAvatarModel {
  name: string;
  url: string;
}

export interface UserModel {
  id: string;
  display_name: string;
  email: string;
  created_date: Date;
  updated_date: Date;
  avatar: string;
}

export interface UserSessionModel extends UserModel {
  tokens: TokenModel;
}

export interface RegisterUserRequestModel {
  display_name: string;
  email: string;
  password: string;
}

export interface RegisterUserResponseModel extends UserModel {
  tokens: TokenModel;
}

export interface LoginUserRequestModel {
  email: string;
  password: string;
}

export interface LoginUserResponseModel extends UserModel{
  tokens: TokenModel;
 }


export interface UpdateUserRequestModel {
  display_name: number;
}

export interface UpdateUserResponseModel{
  data: UserModel;
  success: boolean;
}

export interface DeleteUserResponseModel {
  success: boolean;
}

export interface UploadUserAvatarResponse {
  success: boolean;
  data: UserAvatarModel;
}