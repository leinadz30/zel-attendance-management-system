import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  ops = false;
  constructor(private route: ActivatedRoute) {
    this.ops = this.route.snapshot.data && route.snapshot.data["ops"];
  }
}
