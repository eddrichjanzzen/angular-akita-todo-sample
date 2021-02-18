import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { RegisterUserResponseModel } from 'src/app/core/models/user.model';

export interface SessionState {
   UserData: RegisterUserResponseModel;
}

export function createInitialState(): SessionState {
  return {
    UserData: {
      user: {
        _id: '',
        name: '',
        email: '',
        password: '',
        age: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      token: ''
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}

