import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  profileForm: FormGroup;
  @Input() profileInfo: UserModel;

  constructor() { 
    this.profileForm = new FormGroup({
      email: new FormControl('', Validators.minLength(6)),
      display_name: new FormControl('', Validators.minLength(6)),
      date_created: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

}
