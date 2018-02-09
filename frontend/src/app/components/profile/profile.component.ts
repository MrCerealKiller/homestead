import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  user: User;

  constructor(private fmService: FlashMessagesService,
              private authService: AuthorizeService,
              private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.authService.getUser(this.user).subscribe(data => {
      this.user = data.profile;

      if (this.user.sms_number == null || this.user.sms_number == undefined) {
        this.user.sms_number = 'None Used';
      }
    });
  }

}
