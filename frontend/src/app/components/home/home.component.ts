import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  constructor(private authService: AuthorizeService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
