import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  _id: String;
  username: String;
  email: String;
  emailOrig: String
  sms_number: number;

  constructor(private m_validateService: ValidateService,
              private m_fmService: FlashMessagesService,
              private m_authService: AuthorizeService,
              private m_router: Router) { }

  ngOnInit() {
    this.m_authService.getUser(localStorage.getItem('user')).subscribe(data => {
      this._id = data.profile._id;
      this.email = data.profile.email;
      this.emailOrig = data.profile.email;
      this.sms_number = data.profile.sms_number;
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
    var update = {
      _id: this._id,
      email: this.email,
      sms_number: this.sms_number,
      isEmailUpdate: false
    };

    if (this.email != this.emailOrig) {
      update.isEmailUpdate = true;
    }

    var validateResult = this.m_validateService.validateUserUpdate(update);

    if (validateResult.isErr) {
      //console.log(validateResult.msg);
      this.m_fmService.show(validateResult.msg, {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    // Save Update to Backend
    this.m_authService.updateUser(update).subscribe(data => {
      if (data.success) {
        this.m_fmService.show("Your account has been updated.", {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.m_fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
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
    this.m_authService.deleteUser(this._id).subscribe(data => {
      if (data.success) {
        this.m_fmService.show("Your account has been deleted.", {cssClass: 'alert-normal', timeout: 5000});
        this.m_authService.logout();
        this.m_router.navigate(['/']);
      } else {
        this.m_fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
      }
    });
  }
}
