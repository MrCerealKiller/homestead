import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private m_router: Router) { }

  ngOnInit() {
    var token = localStorage.getItem('id_token');
    var user = localStorage.getItem('user');

    if ((token != null && token != undefined && token != "") &&
        (user  != null && user  != undefined && user  != "")) {
      this.m_router.navigate(['/dashboard']);
    }

    document.getElementsByClassName('navbar-list-right')[0].classList.add('hide');
  }

  ngOnDestroy() {
    document.getElementsByClassName('navbar-list-right')[0].classList.remove('hide');
  }

}
