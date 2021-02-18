import {
  LoginUserRequestModel,
  LoginUserResponseModel,
  LogoutUserResponseModel,
  UserModel,
  UpdateUserRequestModel,
  UpdateUserResponseModel
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
    return this.http.post('/user/register', request);
  }

  loginUser(request: LoginUserRequestModel): Observable<LoginUserResponseModel>{
    return this.http.post('/user/login', request);
  }

  logoutUser(): Observable<LogoutUserResponseModel>{
    return this.http.post('/user/logout', {});
  }

  getUser(): Observable<UserModel>{
    return this.http.get('user/me');
  }

  updateUser(request: UpdateUserRequestModel): Observable<UpdateUserResponseModel>{
    return this.http.put('user/me', request);
  }

}
