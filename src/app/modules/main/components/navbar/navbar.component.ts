import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionQuery } from 'src/app/modules/authentication/state/session.query';
import { SessionService } from 'src/app/modules/authentication/state/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private sessionQuery: SessionQuery,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.sessionQuery.isLoggedIn$;
  }

  logout(): void {
    this.sessionService.logout();
  }

}
