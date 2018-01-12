import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorizeService {
  authToken: any;
  user: any;

  constructor(private m_http: Http) { }

  registerUser(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.m_http.post('http://localhost:3000/users/register',
      user, {headers: headers}).map(res => res.json());
  }
}
