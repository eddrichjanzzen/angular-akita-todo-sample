import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/user.model';
import { SessionQuery } from 'src/app/modules/authentication/state/session.query';
import { SessionService } from 'src/app/modules/authentication/state/session.service';
import { ProfileQuery } from '../../profile/state/profile.query';
import { ProfileService } from '../../profile/state/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  displayName?: string;

  constructor(private sessionQuery: SessionQuery,
              private sessionService: SessionService,
              private profileQuery: ProfileQuery,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.sessionQuery.isLoggedIn$;
  
    this.profileService.fetchProfile();

    this.profileQuery.selectActive()
      .subscribe((profile) => {
        this.displayName = profile?.display_name
      });
  }

  logout(): void {
    this.sessionService.logout();
  }

}
