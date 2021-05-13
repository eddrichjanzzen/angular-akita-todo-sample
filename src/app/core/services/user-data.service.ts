import {
  LoginUserRequestModel,
  LoginUserResponseModel,
  UserModel,
  UpdateUserRequestModel,
  UpdateUserResponseModel,
  DeleteUserResponseModel,
  UploadUserAvatarResponse
} from './../models/user.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegisterUserRequestModel, RegisterUserResponseModel } from '../models/user.model';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: ApiHttpService) { }

  registerUser(request: RegisterUserRequestModel): Observable<RegisterUserResponseModel>{
    return this.http.post('/user/signup', request);
  }

  loginUser(request: LoginUserRequestModel): Observable<LoginUserResponseModel>{
    return this.http.post('/user/login', request);
  }

  getUser(): Observable<UserModel>{
    return this.http.get('/user/me');
  }

  updateUser(request: UpdateUserRequestModel): Observable<UpdateUserResponseModel>{
    return this.http.put('/user/me', request);
  }

  deleteUser(userId: string): Observable<DeleteUserResponseModel>{
    return this.http.delete('/user/me');
  }

  uploadAvatar(file: File): Observable<UploadUserAvatarResponse>{
    const formData: FormData = new FormData();
    formData.append('avatar', file, file.name);
    return this.http.post('/user/me/avatar', formData);
  }

}
