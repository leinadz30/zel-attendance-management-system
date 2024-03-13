import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
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
   }

  ngOnInit() {
    let platform = Capacitor.getPlatform();
    platform = platform.toLowerCase();
    this.version = `${environment.versions[platform]?.version}(${environment.versions[platform]?.build})`;
    if(!environment.versions[platform]?.version || !environment.versions[platform]?.build) {
      this.version = 'Web';
    }
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

}
