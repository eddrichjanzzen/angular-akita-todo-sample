import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  constructor() { }

  getSession(): string {
    const session = window.localStorage.getItem('session');
    if (session){
      return session;
    }
    return 'null';
  }

  saveSession(session: string): void{
    if (session){
      window.localStorage.setItem('session', session);
    }
  }

  destroySession(): void {
    window.localStorage.removeItem('session');
  }

}
