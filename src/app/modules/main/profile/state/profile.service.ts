import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { ProfileStore } from './profile.store';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';


@Injectable({ providedIn: 'root' })
export class ProfileService {

  constructor(private profileStore: ProfileStore,
              private userDataService: UserDataService) {
  }

  fetchProfile() : void {
    this.profileStore.setLoading(true);

    this.userDataService.getUser()
      .subscribe((data: UserModel)=> {

        this.profileStore.add(data);
        this.profileStore.setActive(data.id);

    });

    this.profileStore.setLoading(false);
  }

}
