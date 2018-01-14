import { Component, OnInit } from '@angular/core';

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
  messageTimer: Object;

  constructor() { }

  ngOnInit() { }

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
}
