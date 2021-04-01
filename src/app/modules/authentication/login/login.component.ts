import { Observable } from 'rxjs';
import { SessionService } from './../state/session.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionQuery } from '../state/session.query';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  hide: boolean;

  constructor(private sessionService: SessionService,
              private sessionQuery: SessionQuery) {
    this.hide = true;
    this.isLoading$ = this.sessionQuery.selectLoading();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (this.loginForm.valid){
      this.sessionService.loginUser(this.loginForm.value);
    }
  }

}
