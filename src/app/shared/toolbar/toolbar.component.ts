import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'rehab-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigateByUrl('login');
      });
  }

  loggedIn() {
    if (this.authService.getUserId()) {
      console.log('true');
      return true;
    }
  }
}
