import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  host: {'(document:click)': 'onOutsideClicked($event)'},
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSettingsClicked() {
    document.getElementById("settingsDropdown").classList.toggle("show");
  }

  onLogoutClicked() {
  }

  onOutsideClicked(event) {
    if (!event.target.matches('.navbar-dropbutton') && !event.target.matches('.navbar-dropdown-init')) {
      var settingsDropdown = document.getElementById("settingsDropdown");
      if (settingsDropdown.classList.contains('show')) {
        settingsDropdown.classList.remove('show');
      }
    }
  }
}
