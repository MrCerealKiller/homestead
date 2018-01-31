import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user';
import { Device } from '../../interfaces/device';

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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  // Members related to the typing animation
  message: String;
  msgCount: number = 0;
  messageTimer: number;

  // Stores the user's devices to display in the table
  devices: Device[];

  constructor(private fmService: FlashMessagesService,
              private authService: AuthorizeService,
              private devicePipeService: DevicePipeService,
              private router: Router) {
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
    var user : User = JSON.parse(localStorage.getItem('user'));
    this.devicePipeService.getUserDevices(user, null).subscribe(data => {
      if (data.success) {
        this.devices = data.devices;
      } else {
        this.fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
      }
    });
  }
}
