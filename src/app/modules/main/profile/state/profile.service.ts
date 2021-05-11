import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { ProfileStore } from './profile.store';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Observable } from 'rxjs';
import { UpdateUserRequestModel, UpdateUserResponseModel, UserModel } from 'src/app/core/models/user.model';
import { ToastrService } from 'src/app/core/services/toastr.service';


@Injectable({ providedIn: 'root' })
export class ProfileService {

  constructor(private profileStore: ProfileStore,
              private userDataService: UserDataService,
              private toastrService: ToastrService) {
  }

  fetchProfile() : void {
    this.profileStore.setLoading(true);
    this.userDataService.getUser()
      .subscribe((data: UserModel)=> {
        this.profileStore.add(data);
        this.profileStore.setActive(data.id);
        this.profileStore.setLoading(false);
    }, (err: any) => {
      // set the error state
      this.profileStore.setError(err);
      this.profileStore.setLoading(false);
      this.toastrService.open(err.error.detail, 'x');

    });
    this.profileStore.setLoading(false);
  }

  updateProfile(request: UpdateUserRequestModel) : void {
    this.profileStore.setLoading(true);
    
    this.userDataService.updateUser(request)
      .subscribe((updatedUser: UpdateUserResponseModel) => {
        this.profileStore.updateActive(updatedUser.data);
        this.toastrService.open("Your profile has successfully been updated", "x");
        this.profileStore.setLoading(false);
      });

    this.profileStore.setLoading(false);
  }
}
