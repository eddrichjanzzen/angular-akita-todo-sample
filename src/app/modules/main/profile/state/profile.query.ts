import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserModel } from 'src/app/core/models/user.model';
import { ProfileStore, ProfileState } from './profile.store';

@Injectable({
  providedIn: 'root'
})
export class ProfileQuery extends QueryEntity<ProfileState, UserModel> {

  constructor(protected store: ProfileStore) {
    super(store);
  }

}
