import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';

const translations = ["welcome home.",
                      "bienvenue chez vous.",
                      "おかえり.",
                      "benvenuto a casa."];

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
  devices: Object[];

  constructor(private m_fmService: FlashMessagesService,
              private m_authService: AuthorizeService,
              private m_router: Router) { }

  ngOnInit() {
    // Fill table with values from database
    this.updateDevices();
  }

  ngAfterViewInit() {
    // Choose translation to display
    var messageChoice = Math.floor(Math.random() * (translations.length));
    this.message = translations[messageChoice];

    // Initiate timer to insert letters
    this.messageTimer = setInterval( () => this.typeLetter(), 400);
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

  }
}
