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

    return this.m_http.post('http://localhost:3000/register',
      user, {headers: headers}).map(res => res.json());
  }

  authenticateUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.m_http.post('http://localhost:3000/auth',
      user, {headers: headers}).map(res => res.json());
  }

  getUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('username', user.username);

    return this.m_http.get('http://localhost:3000/users/profile',
    {headers: headers}).map(res => res.json());
  }

  updateUser(update) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.m_http.put('http://localhost:3000/users/profile',
      update, {headers: headers}).map(res => res.json());
  }

  deleteUser(_id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('id', _id);

    return this.m_http.delete('http://localhost:3000/users/profile',
      {headers: headers}).map(res => res.json());
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
