import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rehab-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    this.router.navigateByUrl('login');
    console.log('Loggin out...');
  }

}
