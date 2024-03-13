import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  modal: HTMLIonModalElement;
  version;
  constructor() {
    this.version = `${environment.version}(${environment.build})`;
   }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

}
