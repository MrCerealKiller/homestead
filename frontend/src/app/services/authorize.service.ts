import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorizeService {
  m_authToken: any;
  m_user: any;

  constructor(private m_http: Http) { }

  registerUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.m_http.post('http://localhost:3000/users/register',
      user, {headers: headers}).map(res => res.json());
  }

  authenticateUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.m_http.post('http://localhost:3000/users/auth',
      user, {headers: headers}).map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.m_authToken = token;
    this.m_user = user;
  }

  logout() {
    this.m_user = null;
    this.m_authToken = null;
    localStorage.clear();
  }
}
