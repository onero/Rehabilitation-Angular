import { Component, OnInit } from '@angular/core';
import { LoginEntity } from '../shared/login.entity';

@Component({
  selector: 'rehab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new LoginEntity('', '');
  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }
}
