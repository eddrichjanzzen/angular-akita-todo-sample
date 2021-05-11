import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
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
  @Input() profileInfo?: UserModel;

  constructor(
    private profileQuery: ProfileQuery,
    private profileService: ProfileService) { 
    this.profileForm = new FormGroup({
      email: new FormControl({ value: '', disabled: true}),
      display_name: new FormControl('', Validators.minLength(6))
    });
  }

  ngOnInit(): void {
    this.profileForm.setValue({
      email: this.profileInfo?.email,
      display_name: this.profileInfo?.display_name
    });

    this.isLoading$ = this.profileQuery.selectLoading().pipe(skip(1));
  }

  updateProfile(): void {
    if(this.profileForm.valid){
      this.profileService.updateProfile({
        display_name: this.profileForm?.get('display_name')?.value
      });
    }
  }

}
