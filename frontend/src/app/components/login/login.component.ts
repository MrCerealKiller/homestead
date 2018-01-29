import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  remember: boolean;

  constructor(private m_authService: AuthorizeService,
              private m_fmService: FlashMessagesService,
              private m_router: Router) { }

  ngOnInit() {
    document.getElementsByClassName('navbar-list-right')[0].classList.add('hide');
  }

  ngOnDestroy() {
    document.getElementsByClassName('navbar-list-right')[0].classList.remove('hide');
  }

  onLoginSubmit() {
    var user = {
      username: this.username,
      password: this.password,
      remember: this.remember
    }

    if (user.username && user.password) {
      this.m_authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.m_authService.storeUserData(data.token, data.user);
          this.m_router.navigate(['/dashboard']);
        } else {
          this.m_fmService.show(data.msg, {cssClass: 'alert-danger fade-in-out', timeout: 6000});
          this.m_router.navigate(['/login']);
        }
      });
    }
  }
}
