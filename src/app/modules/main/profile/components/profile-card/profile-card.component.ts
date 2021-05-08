import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/core/models/user.model';
import { ProfileQuery } from '../../state/profile.query';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  profileForm: FormGroup;
  @Input() profileInfo?: UserModel;

  constructor(private profileQuery: ProfileQuery) { 
    this.profileForm = new FormGroup({
      email: new FormControl('', Validators.minLength(6)),
      display_name: new FormControl('', Validators.minLength(6)),
      date_created: new FormControl(''),
    });
  }

  ngOnInit(): void {

      this.profileForm.setValue({
        email: this.profileInfo?.email,
        display_name: this.profileInfo?.display_name,
        date_created: this.profileInfo?.created_date
      })

  }

}
