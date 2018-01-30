import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _id: String;
  username: String;
  email: String;
  emailOrig: String
  sms_number: String;

  constructor(private m_fmService: FlashMessagesService,
              private m_authService: AuthorizeService,
              private m_router: Router) { }

  ngOnInit() {
    this.m_authService.getUser(localStorage.getItem('user')).subscribe(data => {
      this._id = data.profile._id;
      this.username = data.profile.username;
      this.email = data.profile.email;
      this.emailOrig = data.profile.email;
      this.sms_number = data.profile.sms_number;

      if (this.sms_number == null || this.sms_number == undefined || this.sms_number == "") {
        console.log('get here');
        this.sms_number = 'None Used';
      }
    });
  }

}
