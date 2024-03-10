import { Component, OnInit } from '@angular/core';
import { TapLogs } from 'src/app/core/model/tap-logs';

@Component({
  selector: 'app-student-time-info',
  templateUrl: './student-time-info.page.html',
  styleUrls: ['./student-time-info.page.scss'],
})
export class StudentTimeInfoPage implements OnInit {
  modal;
  tapLog: TapLogs;
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
