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
      email: new FormControl('', [Validators.required, Validators.email]),
      name : new FormControl('', [Validators.required, Validators.minLength(6)]),
      age: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), this.checkIfMatchingPasswords]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.checkIfMatchingPasswords])
    });
  }

  ngOnInit(): void {
  }

  onSignUp(): void {
    if (!this.signUpForm.valid){
      return;
    }
  }

  private checkIfMatchingPasswords(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    return password?.value !== '' && confirmPassword?.value !== ''
      && password?.value !== confirmPassword?.value ? { matching: true } : null;
  }

}
