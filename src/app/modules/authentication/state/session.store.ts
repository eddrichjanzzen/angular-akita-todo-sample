import { Injectable } from '@angular/core';
import { akitaConfig, Store, StoreConfig } from '@datorama/akita';
import { RegisterUserResponseModel, UserSessionModel, LoginUserResponseModel } from 'src/app/core/models/user.model';
import * as storage from './storage';
import { resetStores } from "@datorama/akita";

akitaConfig({ resettable: true });

export interface SessionState {
  UserSession: UserSessionModel;
}

export function createInitialState(): SessionState {
  return {
    UserSession: {
      id: '',
      display_name: '',
      email: '',
      avatar: '',
      created_date: new Date(),
      updated_date: new Date(),
      tokens: {
        access: undefined,
        refresh: undefined
      }
    },
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

  register(userData: RegisterUserResponseModel): void{
    this.update(state => {
      return {
        UserSession: userData
      };
    });

    storage.saveSession(userData);
  }

  login(userData: LoginUserResponseModel): void{
    this.update(state => {
      return {
        UserSession: userData
      };
    });

    storage.saveSession(userData);
  }

  clearState(): void {
    storage.clearSession();
    resetStores();
    this.update(createInitialState());
  }

}

