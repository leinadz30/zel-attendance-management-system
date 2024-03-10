import { Component, OnInit } from '@angular/core';
import { LinkStudentRequest } from 'src/app/core/model/link-student-request';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.page.html',
  styleUrls: ['./request-info.page.scss'],
})
export class RequestInfoPage implements OnInit {
  modal;
  request: LinkStudentRequest;
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }


}
