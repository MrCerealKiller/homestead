import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserUpdate } from '../../interfaces/user';
import { Device } from '../../interfaces/device';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})

export class AccountSettingsComponent implements OnInit {
  headers: any;
  panels: any;

  user: User;

  updateEmail: String;
  updateSmsNumber: String;
  emailOrig: String;

  constructor(private validateService: ValidateService,
              private fmService: FlashMessagesService,
              private authService: AuthorizeService,
              private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.authService.getUser(this.user).subscribe(data => {
      this.user = data.profile;
      this.emailOrig = data.profile.email;

      // Prefill
      this.updateEmail = this.user.email;
      if (<number>(this.user.sms_number)) {
        this.updateSmsNumber = this.user.sms_number.toString();
      } else {
        this.updateSmsNumber = <String>this.user.sms_number;
      }
    });
  }

  ngAfterViewInit() {
    this.headers = document.getElementsByClassName('collapse-header')
    this.panels = document.getElementsByClassName('collapse-panel');
  }

  expand(target) {
    for(var i = 0; i < 2; i++) {
      var header = this.headers[i];
      var panel = this.panels[i];

      if(i == target && !header.classList.contains('active-header')) {
        header.classList.add('active-header');
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        header.classList.remove('active-header');
        panel.style.maxHeight = "0";
      }
    }
  }

  onUpdateSubmit() {
    var update : UserUpdate = {
      _id: this.user._id,
      username: this.user.username,
      email: this.updateEmail,
      sms_number: this.updateSmsNumber,
      isEmailUpdate: false
    };

    if (update.email != this.emailOrig) {
      update.isEmailUpdate = true;
    }

    var validateResult = this.validateService.validateUserUpdate(update);

    if (validateResult.isErr) {
      //console.log(validateResult.msg);
      this.fmService.show(validateResult.msg, {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    // Save Update to Backend
    this.authService.updateUser(update).subscribe(data => {
      if (data.success) {
        this.fmService.show("Your account has been updated.", {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
      }
    });
  }

  onDeleteSubmit() {
    // Show Modal Window
    document.getElementById('deleteModal').style.display = "block";
  }

  onCancelDeleteSubmit() {
    // Close Modal Window
    document.getElementById('deleteModal').style.display = "none";
  }

  onConfirmDeleteSubmit() {
    this.authService.deleteUser(this.user._id).subscribe(data => {
      if (data.success) {
        this.fmService.show("Your account has been deleted.", {cssClass: 'alert-normal', timeout: 5000});
        this.authService.logout();
        this.router.navigate(['/']);
      } else {
        this.fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
      }
    });
  }
}
