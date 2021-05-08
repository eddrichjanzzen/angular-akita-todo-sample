import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UserModel } from 'src/app/core/models/user.model';

// remember to inclue active state
export interface ProfileState extends EntityState<UserModel, string>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profile' })
export class ProfileStore extends EntityStore<ProfileState> {

  constructor() {
    super();
  }

}

