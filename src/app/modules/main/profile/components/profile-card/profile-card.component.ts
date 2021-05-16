import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/user.model';
import { ProfileQuery } from '../../state/profile.query';
import { ProfileService } from '../../state/profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  profileForm: FormGroup;
  isLoading$ : Observable<boolean>;
  profileInfo?: UserModel;
  fileToUpload: File;  

  constructor(
    private profileQuery: ProfileQuery,
    private profileService: ProfileService) { 
  }

  ngOnInit(): void {

    this.profileQuery.selectActive().pipe(
      take(1))
      .subscribe((profile) => {
      this.profileInfo = profile;
    });

    this.profileForm = new FormGroup({
      email: new FormControl({ value: this.profileInfo?.email, disabled: true}),
      display_name: new FormControl(this.profileInfo?.display_name, Validators.minLength(6)),
      avatar: new FormControl({ value : ''})
    });

    this.isLoading$ = this.profileQuery.selectLoading();

  }

  updateProfile(): void {
    if(this.profileForm.valid){
      this.profileService.updateProfile({
        display_name: this.profileForm?.get('display_name')?.value
      });
    }
  }
}
