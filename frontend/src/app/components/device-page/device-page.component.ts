import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../../interfaces/user';
import { Device } from '../../interfaces/device';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthorizeService } from '../../services/authorize.service';
import { DevicePipeService } from '../../services/device-pipe.service';

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.css']
})

export class DevicePageComponent implements OnInit {
  headers: any;
  panels: any;

  user: User;
  device: Device;

  constructor(private fmService: FlashMessagesService,
              private devicePipeService: DevicePipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');

    this.user = JSON.parse(localStorage.getItem('user'));
    this.devicePipeService.getUserDevices(this.user, id).subscribe(data => {
      if (data.success) {
        this.device = data.device;
      } else {
        this.fmService.show(data.msg, {cssClass: 'alert-danger', timeout: 6000});
      }
    });
  }

  ngAfterViewInit() {
    this.headers = document.getElementsByClassName('collapse-header')
    this.panels = document.getElementsByClassName('collapse-panel');

    // this.expand(0);
  }

  expand(target) {
    for(var i = 0; i < 4; i++) {
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
