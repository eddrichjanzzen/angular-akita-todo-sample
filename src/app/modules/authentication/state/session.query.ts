import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

  checkToken$ = this.select((state) => toBoolean(state.UserSession.tokens?.access !== ''));
  displayName$ = this.select((state) => state.UserSession.display_name);

  isLoggedIn$ = this.checkToken$.pipe(take(1));

  constructor(protected store: SessionStore) {
    super(store);
  }

  isLoggedIn(): boolean {
    let isLoggedIn = false;

    this.isLoggedIn$.pipe(
      take(1)
    ).subscribe((result: boolean) => {
      isLoggedIn = result;
    });

    return isLoggedIn;

  }
}


