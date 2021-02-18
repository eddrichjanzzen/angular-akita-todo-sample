import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../models/api-http.model';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private http: HttpClient) { }

  public get(path: string, options?: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}${path}`, options);
  }

  public post(path: string, body: any, options?: Options): Observable<any>  {
    return this.http.post(`${environment.apiUrl}${path}`, body, options as any);
  }

  public put(path: string, body: any, options?: Options): Observable<any>  {
      return this.http.put(`${environment.apiUrl}${path}`, body, options as any);
  }

  public delete(path: string, options?: Options): Observable<any>  {
      return this.http.delete(`${environment.apiUrl}${path}`, options as any);
  }
}
