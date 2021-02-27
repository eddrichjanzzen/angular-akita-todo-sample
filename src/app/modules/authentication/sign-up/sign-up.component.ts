import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      display_name: new FormControl('', Validators.minLength(6)),
      password: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  onSignUp(): void {
    if (!this.signUpForm.valid){
      return;
    }
  }

}
