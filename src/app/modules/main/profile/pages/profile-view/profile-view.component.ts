import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { ProfileQuery } from '../../state/profile.query';
import { ProfileService } from '../../state/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  profileInfo?: UserModel;  

  constructor(
    private profileQuery: ProfileQuery,
    private profileService: ProfileService) { }

  ngOnInit(): void {

  }

}
