import { SessionDataService } from './../services/session-data.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private sessionDataService: SessionDataService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const session = this.sessionDataService.getSession();

    if (session !== 'null' && session && session !== undefined) {

      const token = JSON.parse(session).tokens.access;
      // clone and set the header
      const clone: HttpRequest<any> = req.clone({
        headers: req.headers
        .set('Authorization',  `Bearer ${token}`)
      });

      return next.handle(clone);

    }

    return next.handle(req);
  }
}
