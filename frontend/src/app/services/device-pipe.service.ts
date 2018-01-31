import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DevicePipeService {
  authToken: any;

  constructor(private http: Http) { }

  getUserDevices(user, id) {
    this.reloadToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    headers.append('username', user.username);
    headers.append('id', id);

    return this.http.get('http://localhost:3000/users/devices',
      {headers: headers}).map(res => res.json());
  }

  addDevice(device) {
    this.reloadToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);

    return this.http.post('http://localhost:3000/users/devices',
      device, {headers: headers}).map(res => res.json());
  }

  updateDevice(update) {
    this.reloadToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);

    return this.http.put('http://localhost:3000/users/devices',
      update, {headers: headers}).map(res => res.json());
  }

  deleteDevice(_id) {
    this.reloadToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    headers.append('id', _id);

    return this.http.delete('http://localhost:3000/users/devices',
      {headers: headers}).map(res => res.json());
  }

  reloadToken() {
    var token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
