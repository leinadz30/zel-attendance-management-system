import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  mode;
CONST_USER_MODE: any;
  constructor(private route: ActivatedRoute) {
    this.mode = this.route.snapshot.data && route.snapshot.data["mode"];
  }
}
