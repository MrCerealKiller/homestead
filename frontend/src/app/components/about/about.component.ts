import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var token = localStorage.getItem('id_token');
    var user = localStorage.getItem('user');

    if ((token == null || token == undefined || token == "") &&
        (user  == null || user  == undefined || user  == "")) {
      document.getElementsByClassName('navbar-list-right')[0].classList.add('hide');
    }
  }

  ngOnDestroy() {
    document.getElementsByClassName('navbar-list-right')[0].classList.remove('hide');
  }

}
