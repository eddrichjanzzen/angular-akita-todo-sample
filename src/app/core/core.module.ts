import { ToastrService } from './services/toastr.service';
import { SessionDataService } from './services/session-data.service';
import { UserDataService } from './services/user-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    UserDataService,
    SessionDataService,
    ToastrService
  ]
})
export class CoreModule { }
