import { SessionService } from './../state/session.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean;

  constructor(private sessionService: SessionService) {
    this.hide = true;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
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
