import { SessionDataService } from './../services/session-data.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private sessionDataService: sessionDataService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'None'
    };

    const session = this.sessionDataService.getSession();

    if (session !== 'null' && session) {

      const token = JSON.parse(session).Token;

      headersConfig.Authorization = `Bearer ${token}`;

    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
