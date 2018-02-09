import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorizeService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/register',
      user, {headers: headers}).map(res => res.json());
  }

  authenticateUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/auth',
      user, {headers: headers}).map(res => res.json());
  }

  getUser(user) {
    this.reloadToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    headers.append('username', user.username);

    return this.http.get('http://localhost:3000/users/profile',
    {headers: headers}).map(res => res.json());
  }

  updateUser(update) {
    this.reloadToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);

    return this.http.put('http://localhost:3000/users/profile',
      update, {headers: headers}).map(res => res.json());
  }

  deleteUser(_id) {
    this.reloadToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    headers.append('id', _id);

    return this.http.delete('http://localhost:3000/users/profile',
      {headers: headers}).map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  reloadToken() {
    var token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isLoggedIn() {
    this.reloadToken();
    return tokenNotExpired('id_token');
  }

  logout() {
    this.user = null;
    this.authToken = null;
    localStorage.clear();
  }
}
