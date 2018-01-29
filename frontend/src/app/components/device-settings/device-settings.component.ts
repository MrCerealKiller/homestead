import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.css']
})
export class DeviceSettingsComponent implements OnInit {
  headers: any;
  panels: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.headers = document.getElementsByClassName('collapse-header')
    this.panels = document.getElementsByClassName('collapse-panel');
  }

  expand(target) {
    for(var i = 0; i < 3; i++) {
      var header = this.headers[i];
      var panel = this.panels[i];

      if(i == target) {
        header.classList.add('active-header');
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        header.classList.remove('active-header');
        panel.style.maxHeight = "0";
      }
    }
  }
}
