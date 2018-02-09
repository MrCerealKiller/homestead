import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLogin } from '../../interfaces/user';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;
  remember: boolean;

  constructor(private authService: AuthorizeService,
              private fmService: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    var user : UserLogin = {
      username: this.username,
      password: this.password,
      remember: this.remember
    }

    if (user.username && user.password) {
      this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['/dashboard']);
        } else {
          this.fmService.show(data.msg, {cssClass: 'alert-danger fade-in-out', timeout: 6000});
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
