import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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

  /**
   * Sign out and clear localStorage.
   */
  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigateByUrl('login');
      });
  }

  /**
   * Checks if we are logged in.
   * @returns {boolean}
   */
  loggedIn() {
    if (this.authService.getUserId()) {
      return true;
    }
  }

  /**
   * Checks if we are in Client or Therapist mode.
   * @returns {boolean}
   */
  isClientMode() {
    if (this.authService.fireAuth.auth.currentUser) {
      // Checks if the uid is not the same as the Therapist's UID.
      return this.authService.fireAuth.auth.currentUser.uid !== AuthService.THERAPIST_UID;
    } else {
      return true;
    }
  }
}
