import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';
import { DevicePipeService } from '../../services/device-pipe.service';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.css']
})
export class DeviceSettingsComponent implements OnInit {
  headers: any;
  panels: any;

  public devices: Object[];

  // Add Device
  addCustomId: String;
  addAssignedService: String;
  addIpAddress: String;

  // Update Device
  selectedUpdateDevice: Object;
  updateCustomId: String;
  updateAssignedService: String;
  updateIpAddress: String;

  // Delete Device
  selectedDeleteDevice: Object;

  constructor(private m_fmService: FlashMessagesService,
              private m_authService: AuthorizeService,
              private m_devicePipeService: DevicePipeService,
              private m_router: Router) { }

  ngOnInit() {
    var user = localStorage.getItem('user');
    this.m_devicePipeService.getUserDevices(user).subscribe(data => {
      if (data.success) {
        this.devices = data.devices;
      } else {
        this.m_fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
      }
    });
  }

  ngAfterViewInit() {
    this.headers = document.getElementsByClassName('collapse-header')
    this.panels = document.getElementsByClassName('collapse-panel');
  }

  expand(target) {
    for(var i = 0; i < 3; i++) {
      var header = this.headers[i];
      var panel = this.panels[i];

      if(i == target && !header.classList.contains('active-header')) {
        header.classList.add('active-header');
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        header.classList.remove('active-header');
        panel.style.maxHeight = "0";
      }
    }
  }
}
