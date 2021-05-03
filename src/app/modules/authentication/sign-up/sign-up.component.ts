import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SessionQuery } from '../state/session.query';
import { SessionService } from '../state/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  isLoading$: Observable<boolean>;
  
  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) {
    
    this.isLoading$ = this.sessionQuery.selectLoading();
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
    alert('outside clicked');
    if (this.signUpForm.valid){
      alert('clicked');
      this.sessionService.registerUser(this.signUpForm.value);
    }
  }

}
