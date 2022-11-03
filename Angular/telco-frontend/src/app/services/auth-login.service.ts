import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  controllerUrl = `${environment.apiUrl}/auth/login`;

  constructor(private httpClient: HttpClient) { }

  checkLogin(user: User): Observable<User> {
    return this.httpClient.post<User>(this.controllerUrl, user);
  }
}
