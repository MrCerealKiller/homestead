import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  passwordConf: String;
  sms_number: number;

  constructor(private m_validateService: ValidateService,
              private m_fmService: FlashMessagesService,
              private m_authService: AuthorizeService,
              private m_router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    var user = {
      username: this.username,
      email: this.email,
      password: this.password,
      passwordConf: this.passwordConf,
      sms_number: this.sms_number
    };

    var validateResult = this.m_validateService.validateRegister(user);

    if (validateResult.isErr) {
      //console.log(validateResult.msg);
      this.m_fmService.show(validateResult.msg, {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Register User to Backend
    this.m_authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.m_fmService.show("Your account has been registered.", {cssClass: 'alert-success', timeout: 5000});
        this.m_router.navigate(['/login']);
      } else {
        this.m_fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.m_router.navigate(['/register']);
      }
    });
  }
}
