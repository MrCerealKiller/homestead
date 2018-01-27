import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DevicePipeService {

  constructor(private m_http: Http) { }

  getUserDevices(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('username', JSON.parse(user).username);

    return this.m_http.get('http://localhost:3000/users/devices',
      {headers: headers}).map(res => res.json());
  }

  addDevice(device) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.m_http.post('http://localhost:3000/users/devices',
      device, {headers: headers}).map(res => res.json());
  }
}
