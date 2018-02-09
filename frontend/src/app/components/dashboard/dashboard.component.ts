import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';
import { DevicePipeService } from '../../services/device-pipe.service';

const translations = ["welcome home.",
                      "bienvenue chez vous.",
                      "おかえり.",
                      "benvenuto a casa.",
                      "boooork."];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // Members related to the typing animation
  message: String;
  msgCount: number = 0;
  messageTimer: number;

  // Stores the user's devices to display in the table
  public devices = [{
    customId: 'test',
    deviceService: 'test',
    lastIpAddress: 'test',
    lastStatusUpdate: 'test',
    dateLastUpdated: 'test'
  }];

  constructor(private m_fmService: FlashMessagesService,
              private m_authService: AuthorizeService,
              private m_devicePipeService: DevicePipeService,
              private m_router: Router) {
    // Fill table with values from database
    this.updateDevices();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Choose translation to display
    var messageChoice = Math.floor(Math.random() * (translations.length));
    this.message = translations[messageChoice];

    // Initiate timer to insert letters
    this.messageTimer = setInterval( () => this.typeLetter(), 400);
  }

  ngOnDestroy() {
    clearInterval(this.messageTimer)
  }

  typeLetter() {
    // Insert a letter at each interval
    document.getElementById("welcome-home").innerHTML = this.message.substring(0, this.msgCount);

    // Iterate or clear timer to stop animation
    if (this.msgCount == this.message.length) {
      clearInterval(this.messageTimer);
    } else {
      this.msgCount++;
    }
  }

  updateDevices() {
    var user = localStorage.getItem('user');
    this.m_devicePipeService.getUserDevices(user).subscribe(data => {
      if (data.success) {
        this.devices = data.devices;
      } else {
        this.m_fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
      }
    });
  }
}
