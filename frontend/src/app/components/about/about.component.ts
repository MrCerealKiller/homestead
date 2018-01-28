import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementsByClassName('navbar-list-right')[0].classList.add('hide');
  }

  ngOnDestroy() {
    document.getElementsByClassName('navbar-list-right')[0].classList.remove('hide');
  }

}
