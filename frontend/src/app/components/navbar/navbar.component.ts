import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-navbar',
  host: {'(document:click)': 'onOutsideClicked($event)'},
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private authService: AuthorizeService,
              private fmService: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
  }

  onSettingsClicked() {
    document.getElementById('settingsDropdown').classList.toggle('show');
  }

  onLogoutClicked() {
    this.authService.logout();
    this.fmService.show('You\'ve been logged out', {cssClass: 'alert-normal fade-in-out', timeout: 5000});
    this.router.navigate(['/login']);
  }

  onOutsideClicked(event) {
    if (this.authService.isLoggedIn()) {
      if (!event.target.matches('.navbar-dropbutton') && !event.target.matches('.navbar-dropdown-init')) {
        var settingsDropdown = document.getElementById('settingsDropdown');
        if (settingsDropdown.classList.contains('show')) {
          settingsDropdown.classList.remove('show');
        }
      }
    }
  }
}
