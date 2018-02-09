import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegister } from '../../interfaces/user';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  passwordConf: String;
  sms_number: number;

  constructor(private validateService: ValidateService,
              private fmService: FlashMessagesService,
              private authService: AuthorizeService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    var user : UserRegister = {
      username: this.username,
      email: this.email,
      password: this.password,
      passwordConf: this.passwordConf,
      sms_number: this.sms_number
    };

    var validateResult = this.validateService.validateRegister(user);

    if (validateResult.isErr) {
      //console.log(validateResult.msg);
      this.fmService.show(validateResult.msg, {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    // Register User to Backend
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.fmService.show("Your account has been registered.", {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/login']);
      } else {
        this.fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/register']);
      }
    });
  }
}
