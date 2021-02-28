import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { SessionQuery } from 'src/app/modules/authentication/state/session.query';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private sessionQuery: SessionQuery) { }

  canActivate(): boolean {
    if (!this.sessionQuery.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/content']);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}
