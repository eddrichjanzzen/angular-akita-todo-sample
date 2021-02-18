import { RegisterUserRequestModel, RegisterUserResponseModel } from './../../../core/models/user.model';
import { UserDataService } from './../../../core/services/user-data.service';
import { Inject, Injectable } from '@angular/core';

import { SessionStore } from './session.store';
import { PersistState } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private userDataService: UserDataService,
              @Inject('persistStorage') private persistStorage: PersistState,
              ) {
  }

  registerUser(request: RegisterUserRequestModel): void {
    this.persistStorage.clearStore();

    this.sessionStore.setLoading(true);

    this.userDataService.registerUser(request)
    .subscribe((userData: RegisterUserResponseModel) => {
      if (userData.token){
        // update the session store here
        this.sessionStore.update(state => {
          return {
            ...state.UserData,
            UserData: userData
          };
        });
        this.sessionStore.setLoading(false);
      }

    }, (err) => {
      // set the error state
      this.sessionStore.setError(err);
      this.sessionStore.setLoading(false);

    });

  }

}
