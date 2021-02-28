import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { SessionQuery } from 'src/app/modules/authentication/state/session.query';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
              private sessionQuery: SessionQuery){}

  canActivate(): boolean {
    if (this.sessionQuery.isLoggedIn()){
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}
