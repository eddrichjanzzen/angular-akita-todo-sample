import { ToastrService } from './../../../core/services/toastr.service';
import { RegisterUserRequestModel, RegisterUserResponseModel, LoginUserRequestModel, LoginUserResponseModel } from './../../../core/models/user.model';
import { UserDataService } from './../../../core/services/user-data.service';
import { Inject, Injectable } from '@angular/core';

import { SessionStore } from './session.store';
import { PersistState } from '@datorama/akita';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private userDataService: UserDataService,
              private toastrService: ToastrService,
              private router: Router,
              @Inject('persistStorage') private persistStorage: PersistState,
              ) {
  }

  registerUser(request: RegisterUserRequestModel): void {
    this.persistStorage.clearStore();
    this.sessionStore.setLoading(true);

    this.userDataService.registerUser(request)
    .subscribe((userData: RegisterUserResponseModel) => {
      if (userData?.tokens){
        // update the session store here
        this.sessionStore.register(userData);
        this.sessionStore.setLoading(false);
      }

    }, (err) => {
      // set the error state
      this.sessionStore.setError(err);
      this.sessionStore.setLoading(false);

    });

  }


  loginUser(request: LoginUserRequestModel): void {
    this.persistStorage.clearStore();
    this.sessionStore.setLoading(true);

    this.userDataService.loginUser(request)
    .subscribe((userData: LoginUserResponseModel) => {
      if (userData?.tokens !== null){

        // update the session store here
        this.sessionStore.login(userData);
        this.sessionStore.setLoading(false);
        this.router.navigateByUrl('/todos');
      }

    }, (err: any) => {
      // set the error state
      this.sessionStore.setError(err);
      this.sessionStore.setLoading(false);
      this.toastrService.open(err.error.detail, 'x');


    });

  }

  logout(){
    this.persistStorage.clearStore();
    this.sessionStore.clearState();
    this.router.navigateByUrl('/');
  }

}
