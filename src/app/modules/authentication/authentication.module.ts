import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationComponent } from './authentication.component';



@NgModule({
  declarations: [LoginComponent, SignUpComponent, AuthenticationComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
